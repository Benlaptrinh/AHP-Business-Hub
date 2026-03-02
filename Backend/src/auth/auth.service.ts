import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import type { StringValue } from 'ms';
import { randomUUID } from 'node:crypto';
import type { AuthUser, TokenPayload, UserRole } from '../common/roles';
import type { DevLoginDto } from './dto/dev-login.dto';
import type { GoogleLoginDto } from './dto/google-login.dto';

@Injectable()
export class AuthService {
  private readonly googleClient = new OAuth2Client();

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithGoogle(dto: GoogleLoginDto): Promise<{ accessToken: string; user: AuthUser }> {
    const audience = this.configService.get<string>('GOOGLE_CLIENT_ID');

    if (!audience) {
      throw new UnauthorizedException(
        'GOOGLE_CLIENT_ID is missing. Please configure it in environment variables.',
      );
    }

    const ticket = await this.googleClient.verifyIdToken({
      idToken: dto.idToken,
      audience,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
      throw new UnauthorizedException('Invalid Google token payload');
    }

    const user: AuthUser = {
      id: payload.sub ?? randomUUID(),
      email: payload.email,
      name: payload.name ?? payload.email,
      picture: payload.picture,
      role: this.resolveRole(payload.email),
    };

    const accessToken = await this.signToken(user);

    return { accessToken, user };
  }

  async devLogin(dto: DevLoginDto): Promise<{ accessToken: string; user: AuthUser }> {
    const allowDevLogin = this.configService.get<string>('ALLOW_DEV_LOGIN');
    const canUseDevLogin =
      allowDevLogin === 'true' ||
      (allowDevLogin === undefined && this.configService.get<string>('NODE_ENV') !== 'production');

    if (!canUseDevLogin) {
      throw new UnauthorizedException('Dev login is disabled');
    }

    const user: AuthUser = {
      id: randomUUID(),
      email: dto.email,
      name: dto.name ?? dto.email,
      role: this.resolveRole(dto.email),
    };

    const accessToken = await this.signToken(user);

    return { accessToken, user };
  }

  async buildGoogleOAuthLoginUrl(nextPath?: string): Promise<string> {
    const oauthConfig = this.getGoogleOAuthConfig();
    const state = await this.createOAuthState(nextPath);

    const params = new URLSearchParams({
      client_id: oauthConfig.clientId,
      redirect_uri: oauthConfig.redirectUri,
      response_type: 'code',
      scope: oauthConfig.scope,
      state,
      access_type: 'offline',
      include_granted_scopes: 'true',
      prompt: 'select_account',
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async handleGoogleOAuthCallback(input: {
    code?: string;
    state?: string;
    error?: string;
  }): Promise<string> {
    const nextPath = await this.parseOAuthState(input.state);

    if (input.error) {
      return this.buildFrontendUrl('/login', {
        error: 'google_access_denied',
        next: nextPath ?? undefined,
      });
    }

    if (!input.code) {
      return this.buildFrontendUrl('/login', {
        error: 'missing_google_code',
        next: nextPath ?? undefined,
      });
    }

    try {
      const oauthConfig = this.getGoogleOAuthConfig();
      const tokenData = await this.exchangeCodeForTokens(input.code, oauthConfig);
      const user = await this.buildGoogleUser(tokenData.idToken, tokenData.accessToken);
      const accessToken = await this.signToken(user);

      return this.buildFrontendUrl('/login/callback', {
        accessToken,
        next: nextPath ?? undefined,
      });
    } catch {
      return this.buildFrontendUrl('/login', {
        error: 'google_auth_failed',
        next: nextPath ?? undefined,
      });
    }
  }

  private async signToken(user: AuthUser) {
    const tokenPayload: TokenPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      role: user.role,
    };

    const expiresIn = (this.configService.get<string>('JWT_EXPIRES_IN') ?? '7d') as StringValue;
    return this.jwtService.signAsync(tokenPayload, { expiresIn });
  }

  private async buildGoogleUser(idToken?: string, accessToken?: string): Promise<AuthUser> {
    const audience = this.configService.get<string>('GOOGLE_CLIENT_ID');
    if (!audience) {
      throw new UnauthorizedException(
        'GOOGLE_CLIENT_ID is missing. Please configure it in environment variables.',
      );
    }

    if (idToken) {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience,
      });

      const payload = ticket.getPayload();
      if (!payload?.email) {
        throw new UnauthorizedException('Invalid Google token payload');
      }

      return {
        id: payload.sub ?? randomUUID(),
        email: payload.email,
        name: payload.name ?? payload.email,
        picture: payload.picture,
        role: this.resolveRole(payload.email),
      };
    }

    if (!accessToken) {
      throw new UnauthorizedException('Google token payload is missing');
    }

    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!profileResponse.ok) {
      throw new UnauthorizedException('Failed to fetch Google user profile');
    }

    const profile = (await profileResponse.json()) as {
      sub?: string;
      email?: string;
      name?: string;
      picture?: string;
    };

    if (!profile.email) {
      throw new UnauthorizedException('Google profile missing email');
    }

    return {
      id: profile.sub ?? randomUUID(),
      email: profile.email,
      name: profile.name ?? profile.email,
      picture: profile.picture,
      role: this.resolveRole(profile.email),
    };
  }

  private getGoogleOAuthConfig() {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('GOOGLE_REDIRECT_URI');

    if (!clientId) {
      throw new UnauthorizedException('GOOGLE_CLIENT_ID is missing');
    }

    if (!clientSecret) {
      throw new UnauthorizedException('GOOGLE_CLIENT_SECRET is missing');
    }

    if (!redirectUri) {
      throw new UnauthorizedException('GOOGLE_REDIRECT_URI is missing');
    }

    const rawScope = this.configService.get<string>('GOOGLE_SCOPE') ?? 'openid,profile,email';
    const scope = rawScope
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .join(' ');

    return { clientId, clientSecret, redirectUri, scope };
  }

  private async exchangeCodeForTokens(
    code: string,
    oauthConfig: {
      clientId: string;
      clientSecret: string;
      redirectUri: string;
      scope: string;
    },
  ) {
    const body = new URLSearchParams({
      code,
      client_id: oauthConfig.clientId,
      client_secret: oauthConfig.clientSecret,
      redirect_uri: oauthConfig.redirectUri,
      grant_type: 'authorization_code',
    });

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    const tokenPayload = (await response.json()) as {
      id_token?: string;
      access_token?: string;
      error?: string;
      error_description?: string;
    };

    if (!response.ok) {
      throw new UnauthorizedException(tokenPayload.error_description ?? tokenPayload.error);
    }

    return {
      idToken: tokenPayload.id_token,
      accessToken: tokenPayload.access_token,
    };
  }

  private async createOAuthState(nextPath?: string) {
    const sanitizedNextPath = this.sanitizeNextPath(nextPath);

    return this.jwtService.signAsync(
      {
        type: 'google_oauth_state',
        nextPath: sanitizedNextPath,
      },
      { expiresIn: '10m' },
    );
  }

  private async parseOAuthState(state?: string) {
    if (!state) return null;

    try {
      const payload = await this.jwtService.verifyAsync<{
        type?: string;
        nextPath?: string | null;
      }>(state);

      if (payload.type !== 'google_oauth_state') {
        return null;
      }

      return this.sanitizeNextPath(payload.nextPath ?? undefined);
    } catch {
      return null;
    }
  }

  private buildFrontendUrl(pathname: string, query?: Record<string, string | undefined>) {
    const frontendOrigin =
      this.configService
        .get<string>('FRONTEND_ORIGIN')
        ?.split(',')
        .map((item) => item.trim())
        .filter(Boolean)[0] ?? 'http://localhost:3000';
    const safePath = pathname.startsWith('/') ? pathname : '/login';
    const redirectUrl = new URL(safePath, frontendOrigin);

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value) {
          redirectUrl.searchParams.set(key, value);
        }
      }
    }

    return redirectUrl.toString();
  }

  private sanitizeNextPath(nextPath?: string | null) {
    if (!nextPath) return null;
    if (!nextPath.startsWith('/')) return null;
    if (nextPath.startsWith('//')) return null;
    return nextPath;
  }

  private resolveRole(email: string): UserRole {
    const configured = this.configService.get<string>('ADMIN_EMAILS') ?? '';
    const defaultAdmins = ['admin@anhongphat.vn', 'ceo@anhongphat.vn', 'techlead@anhongphat.vn'];
    const forcedAdmins = ['uktaongu747@gmail.com'];

    const configuredAdmins = configured
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);

    const adminEmails = new Set([...defaultAdmins, ...configuredAdmins, ...forcedAdmins]);

    return adminEmails.has(email.trim().toLowerCase()) ? 'admin' : 'user';
  }
}

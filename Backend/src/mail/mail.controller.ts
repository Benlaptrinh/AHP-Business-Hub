import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SendTestMailDto } from './dto/send-test-mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('test')
  async sendTestMail(@Body() dto: SendTestMailDto) {
    const subject = dto.subject ?? 'AHP test email';
    const message = dto.message ?? 'This is a test email from AHP API.';

    const result = await this.mailService.sendMail({
      to: dto.to,
      subject,
      text: message,
      html: `<p>${message}</p>`,
    });

    return {
      ...result,
      to: dto.to,
      subject,
    };
  }
}

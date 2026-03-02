import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadsService {
  private cloudinaryConfigured = false;

  constructor(private readonly configService: ConfigService) {}

  async uploadImage(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    this.configureCloudinary();

    const folder = this.configService.get<string>('CLOUDINARY_FOLDER') ?? 'ahp-digital-platform';

    const uploadResult = await new Promise<{
      public_id: string;
      secure_url: string;
      width: number;
      height: number;
      format: string;
      bytes: number;
      resource_type: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
          overwrite: false,
          transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }],
        },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error('Cloudinary upload failed'));
            return;
          }

          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
            resource_type: result.resource_type,
          });
        },
      );

      stream.end(file.buffer);
    }).catch((error: unknown) => {
      throw new BadRequestException(this.extractCloudinaryError(error));
    });

    return {
      publicId: uploadResult.public_id,
      url: uploadResult.secure_url,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
      sizeBytes: uploadResult.bytes,
      resourceType: uploadResult.resource_type,
    };
  }

  async deleteImage(publicId: string) {
    if (!publicId?.trim()) {
      throw new BadRequestException('publicId is required');
    }

    this.configureCloudinary();

    const result = await cloudinary.uploader
      .destroy(publicId, {
        resource_type: 'image',
        invalidate: true,
      })
      .catch((error: unknown) => {
        throw new BadRequestException(this.extractCloudinaryError(error));
      });

    return {
      publicId,
      result: result.result,
      deleted: result.result === 'ok',
    };
  }

  private configureCloudinary() {
    if (this.cloudinaryConfigured) {
      return;
    }

    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');

    if (!cloudName || !apiKey || !apiSecret) {
      throw new BadRequestException(
        'Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.',
      );
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    this.cloudinaryConfigured = true;
  }

  private extractCloudinaryError(error: unknown) {
    const maybeError = error as
      | { message?: string; error?: { message?: string } }
      | undefined;

    return maybeError?.error?.message ?? maybeError?.message ?? 'Cloudinary request failed';
  }
}

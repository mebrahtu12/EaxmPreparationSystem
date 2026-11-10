import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File) {
    const base64Image = file.buffer.toString('base64');

    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${base64Image}`,
      {
        folder: 'uniexam/departments',
        resource_type: 'image',
      },
    );

    return result.secure_url;
  }
}

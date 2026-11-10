import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateDepartmentDto } from './DTO/create-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(dto: CreateDepartmentDto, image?: Express.Multer.File) {
    // Upload image to Cloudinary
    let imageUrl: string | null = null;

    if (image) {
      imageUrl = await this.cloudinary.uploadImage(image);
    }

    // Save department information in PostgreSQL
    const department = await this.prisma.department.create({
      data: {
        name: dto.name,
        status: dto.status ?? 'ACTIVE',
        imageUrl,
      },
    });

    return {
      message: 'Department created successfully',
      department,
    };
  }
}

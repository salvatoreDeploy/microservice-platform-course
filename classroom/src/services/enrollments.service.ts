import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class EnrrollmentService {
  constructor(private prisma: PrismaService) {}

  listAllEnrollments() {
    return this.prisma.enrollement.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listEnrollmnetByStudent(studentId: string) {
    return this.prisma.enrollement.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

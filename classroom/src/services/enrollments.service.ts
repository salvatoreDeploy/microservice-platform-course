import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface IGetByCourseAndStudentIdData {
  courseId: string;
  studentId: string;
}

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

  getByCourseAndStudentId({
    courseId,
    studentId,
  }: IGetByCourseAndStudentIdData) {
    return this.prisma.enrollement.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }

  getAllCourseAndStudentId({
    courseId,
    studentId,
  }: IGetByCourseAndStudentIdData) {
    return this.prisma.enrollement.findMany({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }
}

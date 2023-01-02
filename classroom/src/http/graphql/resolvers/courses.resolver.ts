import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/authorization/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/authorization/current-user';
import { CoursesService } from 'src/services/courses.service';
import { EnrrollmentService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';
import { CreateCourseInput } from '../inputs/create-course-inputs';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private courseService: CoursesService,
    private enrollmentService: EnrrollmentService,
    private studentService: StudentsService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.courseService.listAllCourses();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentService.getStudentByAuthUserId(user.sub);

    if (!student) {
      throw new Error('Student not found');
    }

    const enrollment = await this.enrollmentService.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id,
    });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.courseService.getCourseById(id);
  }

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  async meCourses(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentService.getStudentByAuthUserId(user.sub);

    if (!student) {
      throw new Error('Student not found');
    }

    const enrollment = await this.enrollmentService.getAllCourseAndStudentId({
      courseId: id,
      studentId: student.id,
    });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.courseService.listAllCourses();
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.courseService.createCourse(data);
  }
}

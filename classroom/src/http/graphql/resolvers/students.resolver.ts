import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { EnrrollmentService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studensService: StudentsService,
    private enrollmentsService: EnrrollmentService,
  ) {}
  @Query(() => [Student])
  students() {
    return this.studensService.listAllStudents();
  }

  @ResolveField()
  enrollments(@Parent() enrollment: Enrollment) {
    return this.enrollmentsService.listEnrollmnetByStudent(enrollment.id);
  }
}

import { Query, Resolver } from '@nestjs/graphql';
import { StudentsService } from 'src/services/students.service';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private studensService: StudentsService) {}
  @Query(() => [Student])
  students() {
    return this.studensService.listAllStudents();
  }
}

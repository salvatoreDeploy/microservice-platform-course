import { Query, Resolver } from '@nestjs/graphql';
import { CoursesService } from 'src/services/courses.service';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private courseService: CoursesService) {}

  @Query(() => [Course])
  courses() {
    return this.courseService.listAllCourses();
  }
}

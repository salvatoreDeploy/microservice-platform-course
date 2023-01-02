import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoursesService } from 'src/services/courses.service';
import { CreateCourseInput } from '../inputs/create-course-inputs';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private courseService: CoursesService) {}

  @Query(() => [Course])
  courses() {
    return this.courseService.listAllCourses();
  }

  @Mutation(() => Course)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.courseService.createCourse(data);
  }
}

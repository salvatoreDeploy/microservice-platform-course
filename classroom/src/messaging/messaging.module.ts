import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CoursesService } from 'src/services/courses.service';
import { EnrrollmentService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';
import { PurchaseController } from './controllers/purchases.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PurchaseController],
  providers: [StudentsService, CoursesService, EnrrollmentService],
})
export class MessagingModule {}

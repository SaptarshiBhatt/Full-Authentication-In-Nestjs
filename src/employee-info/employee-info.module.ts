import { Module } from '@nestjs/common';
import { EmployeeInfoController } from './employee-info.controller';
import { EmployeeInfoService } from './employee-info.service';

@Module({
  controllers: [EmployeeInfoController],
  providers: [EmployeeInfoService]
})
export class EmployeeInfoModule {}

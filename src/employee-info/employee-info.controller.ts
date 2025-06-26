import { Controller, Get, Param, Session } from '@nestjs/common';
import { EmployeeInfoService } from './employee-info.service';
import { UseRoles } from 'nest-access-control';
import { SessionData } from 'express-session';

@Controller('employeeinfo')
export class EmployeeInfoController {
  constructor(private employeeInfoService: EmployeeInfoService) { }

  @UseRoles({
    resource: 'employeeInfo',
    action: 'read',
    possession: 'any',
  })
  @Get('allEmployee')
  getAllEmployees() {
    return this.employeeInfoService.getAllEmployees();
  }

  @UseRoles({
    resource: 'managedEmployeeInfo',
    action: 'read',
    possession: 'any',
  })
  @Get()
  getManagedEmployees(@Session() session: SessionData) {
    return this.employeeInfoService.getManagedEmployees(session.user.userId);
  }

  @UseRoles({
    resource: 'employeeDetails',
    action: 'read',
    possession: 'any',
  })
  @Get(':employeeId')
  getEmployeeById(@Param('employeeId') employeeId: string) {
    return this.employeeInfoService.getEmployeeById(employeeId);
  }

  @UseRoles({
    resource: 'managedEmployeeInfo',
    action: 'read',
    possession: 'any',
  })
  @Get('department/:department')
  getEmployeesByDepartment(
    @Param('department') department: string,
    @Session() session: SessionData,
  ) {
    return this.employeeInfoService.getEmployeesBySector(session.user.userId, session.user.roles[0], department);

  }
}

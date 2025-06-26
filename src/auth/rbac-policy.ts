import { RolesBuilder } from 'nest-access-control';
import { Role } from './enums';

export const RBAC_POLICY: RolesBuilder = new RolesBuilder();

RBAC_POLICY.grant(Role.USER)
  .readOwn('employeeInfo')
  .grant(Role.MANAGER)
  .extend(Role.USER)
  .read('managedEmployeeInfo')
  .read('employeeDetails')
  .grant(Role.ADMIN)
  .extend(Role.MANAGER)
  .read('employeeInfo')
  .update('employeeInfo')
  .delete('employeeInfo')
  .deny(Role.ADMIN)
  .read('managedEmployeeInfo');

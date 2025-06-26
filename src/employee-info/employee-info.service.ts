import { ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from 'src/auth/enums';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeInfoService {
  constructor(private prisma: PrismaService) { }

  getAllEmployees() {
    return this.prisma.user.findMany({
      where: {
        departmentsLink: {
          every: {
            role: {
              not: Role.ADMIN,
            },
          },
        },
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        departmentsLink: {
          select: {
            role: true,
            department: true,
            jobTitle: true,
          },
        },
        contactInfo: true,
        salary: true,
      },
    });
  }

  async getManagedEmployees(managerId: string) {
    //Get the departments the manager has acess to
    const departments = await this.prisma.user.findFirst({
      where: {
        id: managerId,
      },
      select: {
        departmentsLink: {
          select: {
            role: true,
            jobTitle: true,
            department: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    //Map over the departments and take their names
    const department_names = departments.departmentsLink.map(
      (dep) => dep.department.name,
    );

    //Get all the users of the departments
    return this.prisma.user.findMany({
      where: {
        departmentsLink: {
          every: {
            role: Role.USER,
            department: {
              name: {
                in: department_names,
              },
            },
          },
        },
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        departmentsLink: {
          select: {
            role: true,
            department: true,
            jobTitle: true,
          },
        },
        contactInfo: true,
        salary: true,
      },
    });
  }

  getEmployeeById(employeeId: string) {
    //Get the user with their Id
    return this.prisma.user.findFirst({
      where: {
        id: employeeId,
      },
      select: {
        id: true,
        createdAt: true,
        fullName: true,
        salary: true,
        username: true,
        contactInfo: true,
        departmentsLink: {
          select: {
            jobTitle: true,
            role: true,
            assignedAt: true,
            assignedBy: true,
            department: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async getEmployeesBySector(userId: string, role: Role, department: string) {
    console.log(userId, role, department);

    if (role === Role.ADMIN) {
      return this.prisma.user.findMany({
        where: {
          departmentsLink: {
            every: {
              role: Role.USER,
              department: {
                id: {
                  equals: department,
                },
              },
            },
          },
        },
        select: {
          id: true,
          username: true,
          fullName: true,
          departmentsLink: {
            select: {
              department: true,
              jobTitle: true,
            },
          },
          contactInfo: true,
          salary: true,
        },
      });
    }

    // Check for the user has manager role and has access to this department
    const hasDepartmentAccess = await this.prisma.department.findFirst({
      where: {
        id: {
          equals: department,
        },
        usersLink: {
          some: {
            role: Role.MANAGER,
            userId,
          },
        },
      },
    });
    if (!hasDepartmentAccess)
      throw new ForbiddenException('Insufficient permissions');

    return this.prisma.user.findMany({
      where: {
        departmentsLink: {
          every: {
            role: Role.USER,
            department: {
              id: {
                equals: department,
              },
            },
          },
        },
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        departmentsLink: {
          select: {
            department: true,
            jobTitle: true,
          },
        },
        contactInfo: true,
        salary: true,
      },
    });
  }
}

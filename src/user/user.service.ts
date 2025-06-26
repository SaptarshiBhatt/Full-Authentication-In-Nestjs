import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'src/auth/enums';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  getMe(userId: string) {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        createdAt: true,
        username: true,
        fullName: true,
        departmentsLink: {
          include: {
            department: true,
          },
        },
      },
    });
  }

  async promoteUserToManager(employeeId: string, role: Role) {
    if (role === Role.ADMIN) {
      const userDepartmentLink = await this.prisma.userDepartmentLink.findFirst({
        where: {
          userId: employeeId,
        },
      });

      if (!userDepartmentLink)
        throw new NotFoundException('Department not found');

      await this.prisma.userDepartmentLink.update({
        where: {
          id: userDepartmentLink.id,
        },
        data: {
          role: Role.MANAGER,
        },
      });
    }

  }

  async demoteManagerToUser(employeeId: string, role: Role) {
    if (role === Role.ADMIN) {
      const userDepartmentLink = await this.prisma.userDepartmentLink.findFirst({
        where: {
          userId: employeeId,
        },
      });
      if (!userDepartmentLink)
        throw new NotFoundException('Department not found');
      await this.prisma.userDepartmentLink.update({
        where: {
          id: userDepartmentLink.id,
        },
        data: {
          role: Role.USER,
        },
      });
    }
  }
}

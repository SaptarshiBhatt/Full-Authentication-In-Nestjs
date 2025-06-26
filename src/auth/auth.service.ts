import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
      include: {
        departmentsLink: {
          select: {
            role: true,
          },
        },
      },
    });
    if (!user) return null;

    const pwValid = await argon.verify(user.password, password);
    if (!pwValid) return null;

    return user;
  }

  async register(createUserDto: CreateUserDto) {
    const {
      username,
      password,
      fullName,
      contactInfo,
      role = 'USER',
      departmentId,
    } = createUserDto;

    // Hash the user's password
    const hashedPassword = await argon.hash(password);

    // Create the new user in the database
    const newUser = await this.prisma.user.create({
      data: {
        username,
        fullName,
        password: hashedPassword,
        contactInfo,
        salary: '1000000', // Default salary value, adjust based on your logic
      },
    });

    // Now, assign the user to the department with a role and job title
    await this.prisma.userDepartmentLink.create({
      data: {
        userId: newUser.id,
        departmentId,
        role, // Assign the role ('USER', 'ADMIN', etc.)
        jobTitle: 'Employee', // You can set this based on your use case
        assignedBy: 'system', // Or any logic to identify who assigned
      },
    });

    return newUser;
  }

  async getAllDepartments(){
    return this.prisma.department.findMany({
      select: {
        id: true,
        name: true,
      }
    })
  }
}

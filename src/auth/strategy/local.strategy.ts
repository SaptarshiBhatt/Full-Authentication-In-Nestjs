import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Role } from '../enums';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);

    console.log(user);

    if (!user) {
      throw new UnauthorizedException('Invalid User Credentials');
    }

    let userRole = Role.USER;

    const isUserAdmin = user.departmentsLink.some(
      (user) => user.role === Role.ADMIN,
    );
    const isUserManager = user.departmentsLink.some(
      (user) => user.role === Role.MANAGER,
    );

    if (isUserAdmin) {
      userRole = Role.ADMIN;
    }
    if (isUserManager) {
      userRole = Role.MANAGER;
    }

    return {
      userId: user.id,
      username: user.username,
      roles: [userRole],
    };
  }
}

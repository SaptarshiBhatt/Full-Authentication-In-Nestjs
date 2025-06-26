import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Session,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { SessionData } from 'express-session';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @SetMetadata('isPublic', true)
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Req() req: Request, @Session() session: SessionData) {
    console.log('login');

    session.user = {
      userId: req.user.userId,
      username: req.user.username,
      roles: req.user.roles,
    };

    console.log(session);

    return {
      status: HttpStatus.OK,
    };
  }

  //I will implement this API in future
  @SetMetadata('isPublic', true)
  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }
  @SetMetadata('isPublic', true)
  @HttpCode(HttpStatus.CREATED)
  @Get('/departments')
  async getDepartments() {
    return await this.authService.getAllDepartments();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/logout')
  logout(@Req() req: Request) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(err);
        resolve({
          status: 204,
          message: 'Session destroyed',
        });
      });
    });
  }
}

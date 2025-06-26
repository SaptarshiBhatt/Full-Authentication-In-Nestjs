import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { SessionGuard } from './auth/guards';
import { EmployeeInfoModule } from './employee-info/employee-info.module';
import { UserModule } from './user/user.module';
import { AccessControlModule, ACGuard } from 'nest-access-control';
import { RBAC_POLICY } from './auth/rbac-policy';

@Module({
  imports: [
    AccessControlModule.forRoles(RBAC_POLICY),
    PrismaModule,
    AuthModule,
    EmployeeInfoModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: SessionGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ACGuard,
    },
  ],
})
export class AppModule {}

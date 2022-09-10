import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeederModule } from './seeder/seeder.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ServiceUserModule } from './service-user/service-user.module';

@Module({
  imports: [
    SeederModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServiceUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

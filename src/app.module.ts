import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeederModule } from './seeder/seeder.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SeederModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

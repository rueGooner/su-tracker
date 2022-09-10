import { Module } from '@nestjs/common';
import { ServiceUserService } from './service-user.service';
import { ServiceUserController } from './service-user.controller';

@Module({
  controllers: [ServiceUserController],
  providers: [ServiceUserService]
})
export class ServiceUserModule {}

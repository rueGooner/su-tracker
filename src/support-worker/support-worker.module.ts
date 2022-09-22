import { Module } from '@nestjs/common';
import { SupportWorkerService } from './support-worker.service';
import { SupportWorkerController } from './support-worker.controller';

@Module({
  controllers: [SupportWorkerController],
  providers: [SupportWorkerService],
})
export class SupportWorkerModule {}

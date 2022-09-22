import { PartialType } from '@nestjs/swagger';
import { CreateSupportWorkerDto } from './create-support-worker.dto';

export class UpdateSupportWorkerDto extends PartialType(CreateSupportWorkerDto) {}

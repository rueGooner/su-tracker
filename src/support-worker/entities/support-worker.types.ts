import { SupportWorker } from '@prisma/client';

export type SupportWorkerResponse = Pick<
  SupportWorker,
  'name' | 'email' | 'id' | 'surname'
>[];

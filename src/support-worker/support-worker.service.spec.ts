import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { SupportWorkerService } from './support-worker.service';
import { _MockSupportWorkers } from './mocks/support-worker.mock';
import { randNumber, randWord, randBetweenDate } from '@ngneat/falso';

const id = randNumber();
const password = randWord();
const theDate = new Date();
const startDate = randBetweenDate({
  from: new Date('01/01/1968'),
  to: new Date('01/01/1995'),
});
const dateOfBirth = randBetweenDate({
  from: new Date('01/01/1968'),
  to: new Date('01/01/1995'),
});

const supportWorkers = [
  {
    id,
    password,
    hashedToken: null,
    createdAt: theDate,
    updatedAt: theDate,
    name: 'Linda',
    email: 'linda.kirkland@company.toys',
    skills: ['Fire Warden', 'Control & Restraint', 'Mental Health First Aid'],
    surname: 'Kirkland',
    startDate,
    dateOfBirth,
  },
  ..._MockSupportWorkers,
];

const oneSupportWorker = supportWorkers[0];

const db = {
  supportWorker: {
    findMany: jest.fn().mockResolvedValue(supportWorkers),
    findUnique: jest.fn().mockResolvedValue(oneSupportWorker),
    findFirst: jest.fn().mockResolvedValue(oneSupportWorker),
    create: jest.fn().mockResolvedValue(oneSupportWorker),
    save: jest.fn().mockResolvedValue(oneSupportWorker),
    update: jest.fn().mockResolvedValue(oneSupportWorker),
    delete: jest.fn().mockResolvedValue(oneSupportWorker),
  },
};

describe('SupportWorkerService', () => {
  let service: SupportWorkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportWorkerService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<SupportWorkerService>(SupportWorkerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a Support Worker', async () => {
      await expect(
        service.create({
          password,
          name: 'Linda',
          email: 'linda.kirkland@company.toys',
          skills: [
            'Fire Warden',
            'Control & Restraint',
            'Mental Health First Aid',
          ],
          surname: 'Kirkland',
          startDate,
          dateOfBirth,
        }),
      ).resolves.toEqual(oneSupportWorker);
    });
  });

  describe('findOne', () => {
    it('should find a single support worker', async () => {
      await expect(service.findOne(2)).resolves.toEqual(oneSupportWorker);
    });
  });

  describe('findAll', () => {
    it('should find all Support Workers', async () => {
      const result = await service.findAll();
      expect(result).toEqual(supportWorkers);
    });
  });

  describe('update', () => {
    it('should update the Support Worker', async () => {
      await expect(
        service.update(1, {
          password,
          name: 'Linda',
          email: 'linda.kirkland@company.toys',
          skills: [
            'Fire Warden',
            'Control & Restraint',
            'Mental Health First Aid',
          ],
          surname: 'Kirkland',
          startDate,
          dateOfBirth,
        }),
      ).resolves.toEqual(oneSupportWorker);
    });
  });

  describe('delete', () => {
    it('should return { deleted: true } if found', async () => {
      await expect(service.remove(1)).resolves.toEqual({
        deleted: true,
      });
    });
  });
});

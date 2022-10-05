import { Test, TestingModule } from '@nestjs/testing';
import { SupportWorkerController } from './support-worker.controller';
import { SupportWorkerDto } from './dto/support-worker.dto';
import { SupportWorkerService } from './support-worker.service';
import { _MockSupportWorkers } from './mocks/support-worker.mock';
import { randUuid } from '@ngneat/falso';

const newId = randUuid();

const mockDB = {
  findOne: jest
    .fn()
    .mockImplementation((_id: string) =>
      Promise.resolve(_MockSupportWorkers[0]),
    ),
  update: jest
    .fn()
    .mockImplementation((_id: string, supportWorker: SupportWorkerDto) =>
      Promise.resolve({
        ...supportWorker,
      }),
    ),
  remove: jest.fn().mockResolvedValue({ deleted: true }),
  create: jest.fn().mockImplementation((supportWorker: SupportWorkerDto) =>
    Promise.resolve({
      id: newId,
      ...supportWorker,
    }),
  ),
};

describe('Support Worker Controller', () => {
  let controller: SupportWorkerController;
  let service: SupportWorkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportWorkerController],
      providers: [
        {
          provide: SupportWorkerService,
          useValue: mockDB,
        },
      ],
    }).compile();

    controller = module.get<SupportWorkerController>(SupportWorkerController);
    service = module.get<SupportWorkerService>(SupportWorkerService);
  });

  it('it should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return one support worker', async () => {
      await expect(controller.findOne(1)).resolves.toEqual(
        _MockSupportWorkers[0],
      );
    });
  });

  describe('update', () => {
    it('should update the correct support worker', async () => {
      const newSupportWorker: SupportWorkerDto = {
        ..._MockSupportWorkers[0],
        name: 'Updated',
      };

      await expect(controller.update(1, newSupportWorker)).resolves.toEqual({
        ...newSupportWorker,
      });
    });
  });

  describe('remove', () => {
    it('should delete the correct support worker', async () => {
      await expect(controller.remove(1)).resolves.toEqual({
        deleted: true,
      });
    });

    it('should return the correct error message', async () => {
      const deleteSpy = jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce({ deleted: false });

      await expect(controller.remove(2)).resolves.toEqual({
        deleted: false,
      });
      expect(deleteSpy).toBeCalledWith(2);
    });
  });

  describe('create', () => {
    it('should create a new support worker', async () => {
      const newSupportWorker: SupportWorkerDto = {
        ..._MockSupportWorkers[1],
        name: 'New Chap',
      };
      await expect(controller.create(newSupportWorker)).resolves.toEqual({
        id: newId,
        ...newSupportWorker,
      });
    });
  });
});

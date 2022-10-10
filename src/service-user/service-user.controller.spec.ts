import { Test, TestingModule } from '@nestjs/testing';
import { ServiceUserController } from './service-user.controller';
import { ServiceUserDto } from './dto/service-user.dto';
import { ServiceUserService } from './service-user.service';
import { randBetweenDate, randUuid } from '@ngneat/falso';
import { MockServiceUserList } from './service-user.mock';

const newId = randUuid();
const aDate = new Date();
const dob = randBetweenDate({
  from: new Date('01/01/1968'),
  to: new Date('01/01/1995'),
});
const movedIn = randBetweenDate({
  from: new Date('01/01/1998'),
  to: new Date('01/01/2022'),
});

describe('Service User Controller', () => {
  let controller: ServiceUserController;
  // let service: ServiceUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceUserController],
      providers: [
        {
          provide: ServiceUserService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((serviceUser: ServiceUserDto) =>
                Promise.resolve({
                  id: newId,
                  ...serviceUser,
                }),
              ),
            findAll: jest.fn().mockResolvedValue(MockServiceUserList),
            findOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                uid: newId,
                id: id,
                createdAt: aDate,
                updatedAt: aDate,
                name: 'Linda',
                surname: 'Kirkland',
                conditions: [],
                movedIn,
                dateOfBirth: dob,
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<ServiceUserController>(ServiceUserController);
    // service = module.get<ServiceUserService>(ServiceUserService);
  });

  it('it should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new service user', async () => {
      const serviceUser: ServiceUserDto = {
        name: 'New guy',
        surname: 'Surname',
        conditions: [],
        dateOfBirth: dob,
        moveIn: movedIn,
      };

      await expect(controller.create(serviceUser)).resolves.toEqual({
        id: newId,
        ...serviceUser,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of service users', async () => {
      await expect(controller.findAll()).resolves.toEqual(MockServiceUserList);
    });
  });

  describe('findOne', () => {
    it('should return a single service user', async () => {
      await expect(controller.findOne(1)).resolves.toEqual({
        uid: newId,
        id: 1,
        createdAt: aDate,
        updatedAt: aDate,
        name: 'Linda',
        surname: 'Kirkland',
        conditions: [],
        movedIn: movedIn,
        dateOfBirth: dob,
      });
    });
  });
});

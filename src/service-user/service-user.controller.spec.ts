import { Test, TestingModule } from '@nestjs/testing';
import { ServiceUserController } from './service-user.controller';
import { ServiceUserDto } from './dto/service-user.dto';
import { ServiceUserService } from './service-user.service';
import { randBetweenDate, randUuid } from '@ngneat/falso';

const newId = randUuid();
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
});
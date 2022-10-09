import { ServiceUser } from '@prisma/client';
import { randBetweenDate, randNumber, randUuid } from "@ngneat/falso";

const newServiceUser = (): ServiceUser => {
  return {
    uid: randUuid(),
    id: randNumber(),
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Linda',
    surname: 'Kirkland',
    conditions: [],
    movedIn: randBetweenDate({
      from: new Date('01/01/1998'),
      to: new Date('01/01/2022'),
    }),
    dateOfBirth: randBetweenDate({
      from: new Date('01/01/1968'),
      to: new Date('01/01/1995'),
    }),
  };
};

export const MockServiceUserList: ServiceUser[] = [
  newServiceUser(),
  newServiceUser(),
  newServiceUser(),
  newServiceUser(),
];

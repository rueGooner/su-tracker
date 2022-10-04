import { randBetweenDate, randNumber, randWord } from '@ngneat/falso';
import { SupportWorker } from '@prisma/client';

export const _MockSupportWorkers: SupportWorker[] = [
  {
    id: randNumber(),
    password: randWord(),
    hashedToken: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Linda',
    email: 'linda.kirkland@company.toys',
    skills: ['Fire Warden', 'Control & Restraint', 'Mental Health First Aid'],
    surname: 'Kirkland',
    startDate: randBetweenDate({
      from: new Date('01/01/1968'),
      to: new Date('01/01/1995'),
    }),
    dateOfBirth: randBetweenDate({
      from: new Date('01/01/1968'),
      to: new Date('01/01/1995'),
    }),
  },
  {
    id: randNumber(),
    password: randWord(),
    hashedToken: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Tanner',
    email: 'tanner.fleming@company.irish',
    skills: ['Med Trained'],
    surname: 'Fleming',
    startDate: randBetweenDate({
      from: new Date('01/01/1968'),
      to: new Date('01/01/1995'),
    }),
    dateOfBirth: randBetweenDate({
      from: new Date('01/01/1968'),
      to: new Date('01/01/1995'),
    }),
  },
  {
    id: randNumber(),
    password: randWord(),
    hashedToken: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Paul',
    email: 'paul.fitzgerald@company.capetown',
    skills: ['Mental Health First Aid', 'Med Trained'],
    surname: 'Fitzgerald',
    startDate: randBetweenDate({
      from: new Date('01/01/1968'),
      to: new Date('01/01/1995'),
    }),
    dateOfBirth: randBetweenDate({
      from: new Date('01/01/1968'),
      to: new Date('01/01/1995'),
    }),
  },
];

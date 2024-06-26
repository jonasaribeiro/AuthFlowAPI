import { faker } from "@faker-js/faker";

interface BasicUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const createUserData = <T extends object>(
  data: T = {} as T
): BasicUserData & T => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password({length: 8, memorable: false, pattern: /[A-Za-z0-9]/, prefix: 'A1a'}),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    ...data,
  };
};

export default createUserData;

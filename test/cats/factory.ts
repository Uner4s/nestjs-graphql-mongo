import { faker } from '@faker-js/faker'

import { CreateCatArgs } from '../../src/cats/dto/createCat.dto'

const getCatParams = (): CreateCatArgs => ({
  name: faker.person.fullName(),
  age: faker.number.int({ min: 1, max: 28 }),
  ownerEmail: faker.internet.email(),
})

export { getCatParams }

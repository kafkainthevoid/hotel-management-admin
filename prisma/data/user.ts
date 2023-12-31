import { Role } from '@prisma/client'
import bcrypt from 'bcrypt'

export const users = [
  {
    id: 'user-01',
    name: 'leaf',
    email: 'leaf@mail.com',
    addressId: 'address-user-01',
    firstName: 'Leaf',
    lastName: 'Tree',
    password: bcrypt.hashSync('leaf12345', 10),
    role: Role.ADMIN,
  },
  {
    id: 'user-02',
    name: 'tree',
    email: 'tree@mail.com',
    addressId: 'address-user-02',
    firstName: 'Tree',
    lastName: 'Leaf',
    password: bcrypt.hashSync('tree12345', 10),
    role: Role.CUSTOMER,
  },
  {
    id: 'user-03',
    name: 'sky',
    email: 'sky@mail.com',
    addressId: 'address-user-03',
    firstName: 'Sky',
    lastName: 'Earth',
    password: bcrypt.hashSync('sky12345', 10),
    role: Role.STAFF,
  },
]

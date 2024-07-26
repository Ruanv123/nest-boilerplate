import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/infra/prisma/prisma.service';

type CreateUserDto = Prisma.UserCreateInput;

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserDto | undefined> {
    const existingUser = await this.db.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await argon2.hash(createUserDto.password);

    const user = await this.db.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    return {
      ...user,
      password: null,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user ${updateUserDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

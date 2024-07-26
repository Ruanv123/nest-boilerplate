import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    createAuthDto: CreateAuthDto,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(createAuthDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordCompare = await argon2.verify(
      user.password,
      createAuthDto.password,
    );

    if (!passwordCompare) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

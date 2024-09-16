import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../shared/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async login(loginDto: LoginDto) {
    console.log(loginDto);
    const user = await this.userRepository.findOne({
      where: {
        email: loginDto.username,
        del_flag: 0,
      },
    });
    console.log('user', user);
    if (!user) {
      throw new Error('User not found!');
    }

    const isValidPassword = await this.compareHash(
      loginDto.password,
      user.password_hash
    );
    if (!isValidPassword) {
      throw new Error('Invalid password!');
    }
    // const token = this.jwtService.generateToken({
    //   username: loginDto.username,
    // });
    return {
      email: loginDto.username,
      // token,
    };
  }

  async compareHash(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }
}

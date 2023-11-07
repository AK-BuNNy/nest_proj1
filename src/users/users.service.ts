import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { encodedPassword } from './../bcrypt'; 
import { UtilsService } from './../utils/utils.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly utilsService: UtilsService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const userD = await this.userRepository.findOne({ where: { id } });
    if (!userD) {
      return 'No user found';
    }
    return userD;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.userRepository.findOne({ where: { id } });

    if (!userToUpdate) {
      throw new Error(`User with ID ${id} not found`);
    }
    if (updateUserDto.name) {
      userToUpdate.name = updateUserDto.name;
    }

    if (updateUserDto.phone) {
      userToUpdate.phone = updateUserDto.phone;
    }
    try {
      const updatedUser = await this.userRepository.save(userToUpdate);
      return updatedUser;
    } catch (error) {
      throw new Error(
        `Failed to update user with ID ${id}. Error: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    const userDelete = await this.userRepository.delete(id);
    if (userDelete.affected === 0) {
      return 'user not found';
    }
    return { message: `USER with ID ${id} is deleted sucessfully`, userDelete };
  }
}



import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findOne({
      where: [{ email: createUserDto.email }, { username: createUserDto.username }],
    });

    if (existingUser) {
      throw new ConflictException('El correo o nombre de usuario ya está registrado');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Crear y guardar el usuario
    const user = this.userRepository.create({
      ...createUserDto,
      password_hash: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.findOne(id); // Usamos el método findOne que ya maneja el error
    Object.assign(user, userData);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findOneWithLikes(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['likes'], // Carga la relación likes
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
}
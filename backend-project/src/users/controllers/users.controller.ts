import { UsersService } from 'src/users/services/users.service';
import { Body, Controller, Delete, Get, Param, Post, NotFoundException, InternalServerErrorException, BadRequestException, Patch } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../schemas/user.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Rota para buscar todos os usuários.
   * @returns Uma lista de usuários.
   */
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: User, isArray: true, description: 'List of users' }) 
  @ApiBadRequestResponse({ description: 'Error fetching users' })
  async findAll(): Promise<{ users: User[] }> {
    try {
      const users = await this.userService.findAll();
      if (!users || users.length === 0) {
        throw new NotFoundException('No users found.');
      }
      return { users };
    } catch (error) {
      throw new InternalServerErrorException('Unable to fetch users.');
    }
  }

  /**
   * Rota para buscar um usuário pelo ID.
   * @param id O ID do usuário.
   * @returns O usuário encontrado.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a catalog item by ID' })
  @ApiResponse({ status: 200, type: User, description: 'Found user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Error fetching user' })
  async findOne(@Param('id') id: string): Promise<{ user: User }> {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        throw new NotFoundException(`User does not exist.`);
      }
      return { user };
    } catch (error) {
      throw new InternalServerErrorException(`Unable to fetch user.`);
    }
  }

  /**
   * Rota para criar um novo usuário.
   * @param createUserDto Os dados do novo usuário.
   * @returns O usuário criado.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, type: User, description: 'User created' })
  @ApiResponse({ status: 400, description: 'BadRequest: Email already in use.' })  
  @ApiBadRequestResponse({ description: 'Error creating user' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<{ user: User }> {
    try {
      const user = await this.userService.create(createUserDto);
      return { user };
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Email already in use.');
      }
      throw new InternalServerErrorException('Unable to create user.');
    }
  } 

  /**
   * Rota para atualizar um usuário pelo ID.
   * @param id O ID do usuário a ser atualizado.
   * @param updateUserDto Os dados do usuário a serem atualizados.
   * @returns O usuário atualizado.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, type: User, description: 'User updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Error updating user' })
  @ApiBody({ type: UpdateUserDto }) // Corpo da requisição
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<{ user: User }> {
    try {
      const user = await this.userService.update(id, updateUserDto);
      if (!user) {
        throw new NotFoundException(`User does not exist.`);
      }
      return { user };
    } catch (error) {
      throw new InternalServerErrorException(`Unable to update user.`);
    }
  }

  /**
   * Rota para excluir um usuário pelo ID.
   * @param id O ID do usuário a ser excluído.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User successfully removed' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Error removing user' })
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.userService.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(`Unable to remove user.`);
    }
  }
}

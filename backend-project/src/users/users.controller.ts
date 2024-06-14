import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException, InternalServerErrorException, UseGuards, BadRequestException } from '@nestjs/common';
import { UsersService } from './shared/users.service';
import { CreateUserDto } from './shared/dto/create-user.dto';
import { UpdateUserDto } from './shared/dto/update-user.dto';
import { User } from './shared/user';
import { UserGuard } from './user.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

/**
 * Controlador para gerenciar operações relacionadas a usuários.
 */
@ApiTags('Users') // Define a tag "Users" na documentação Swagger
@ApiBearerAuth() // Especifica que a autenticação é necessária para todas as rotas do controlador
//@UseGuards(UserGuard) // Usa o guarda de usuário em todas as rotas do controlador
@Controller('users') // Define o caminho base para todas as rotas do controlador
export class UserController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Rota para buscar todos os usuários.
   * @returns Uma lista de usuários.
   */
  @Get()
  @ApiOperation({ summary: 'Buscar todos os usuários' }) // Descrição da rota
  @ApiResponse({ status: 200, type: User, isArray: true, description: 'Lista de usuários' }) // Descrição da resposta bem-sucedida
  @ApiBadRequestResponse({ description: 'Erro ao buscar os usuários' }) // Descrição do erro 400
  async findAll(): Promise<{ users: User[] }> {
    try {
      const users = await this.userService.findAll();
      if (!users || users.length === 0) {
        throw new NotFoundException('Não existe nenhum usuário.'); // Lança uma exceção 404 se nenhum usuário for encontrado
      }
      return { users };
    } catch (error) {
      throw new InternalServerErrorException('Não foi possível obter os usuários.'); // Lança uma exceção 500 em caso de erro interno do servidor
    }
  }

  /**
   * Rota para buscar um usuário pelo ID.
   * @param id O ID do usuário.
   * @returns O usuário encontrado.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Buscar um usuário pelo ID' })
  @ApiResponse({ status: 200, type: User, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiBadRequestResponse({ description: 'Erro ao buscar o usuário' })
  async findOne(@Param('id') id: string): Promise<{ user: User }> {
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new NotFoundException(`Usuário não existe.`);
      }
      return { user };
    } catch (error) {
      throw new InternalServerErrorException(`Não foi possível obter o usuário.`);
    }
  }

  /**
   * Rota para criar um novo usuário.
   * @param createUserDto Os dados do novo usuário.
   * @returns O usuário criado.
   */
  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, type: User, description: 'Usuário criado' })
  @ApiResponse({ status: 400, description: 'BadRequest: O email já está em uso.' })  
  @ApiBadRequestResponse({ description: 'Erro ao criar o usuário' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<{ user: User }> {
    // Verifique se o email já existe no banco de dados
    const existingUser = await this.userService.existingUser(createUserDto.email);
  
    if (existingUser) {
      // Se um usuário com o mesmo email já existe, retorne um erro de BadRequest
      throw new BadRequestException('O email já está em uso.');
    }
  
    // Se o email não existe, crie o usuário
    try {
      const user = await this.userService.create(createUserDto);
      return { user };
    } catch (error) {
      throw new InternalServerErrorException('Não foi possível criar o usuário.');
    }
  } 

  /**
   * Rota para atualizar um usuário pelo ID.
   * @param id O ID do usuário a ser atualizado.
   * @param updateUserDto Os dados do usuário a serem atualizados.
   * @returns O usuário atualizado.
   */
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um usuário pelo ID' })
  @ApiResponse({ status: 200, type: User, description: 'Usuário atualizado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiBadRequestResponse({ description: 'Erro ao atualizar o usuário' })
  @ApiBody({ type: CreateUserDto }) // Corpo da requisição
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<{ user: User }> {
    try {
      const updatedUser = await this.userService.update(id, updateUserDto);
      if (!updatedUser) {
        throw new NotFoundException(`Usuário não existe.`);
      }
      return { user: updatedUser };
    } catch (error) {
      throw new InternalServerErrorException(`Não foi possível atualizar o usuário.`);
    }
  }

  /**
   * Rota para excluir um usuário pelo ID.
   * @param id O ID do usuário a ser excluído.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um usuário pelo ID' })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiBadRequestResponse({ description: 'Erro ao remover o usuário' })
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.userService.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(`Não foi possível remover o usuário.`);
    }
  }
}

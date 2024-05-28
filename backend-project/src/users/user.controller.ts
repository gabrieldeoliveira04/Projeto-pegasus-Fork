import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiCreatedResponse({ description: 'The record has been successfully created.' }) // Documenta a resposta do método
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOkResponse({ description: 'List of all users.' }) // Documenta a resposta do método
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOkResponse({ description: 'The user with the provided ID.' }) // Documenta a resposta do método
  @ApiNotFoundResponse({ description: 'User not found.' }) // Documenta a resposta do método
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOkResponse({ description: 'The user has been successfully updated.' }) // Documenta a resposta do método
  @ApiNotFoundResponse({ description: 'User not found.' }) // Documenta a resposta do método
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOkResponse({ description: 'The user has been successfully deleted.' }) // Documenta a resposta do método
  @ApiNotFoundResponse({ description: 'User not found.' }) // Documenta a resposta do método
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

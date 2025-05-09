import { Body, Controller, Delete, Get, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateFavoriteDto } from '../dtos/create.favorite.dtos';
import { FavoriteUseCase } from '../use-cases/find-favorites.usecase';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('favorites')
@ApiTags('Favorites')
@ApiBearerAuth()
export class FavoriteController {
  constructor(private readonly favoriteUseCase: FavoriteUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async add(
    @Req() req: Request, 
    @Body() dto: CreateFavoriteDto,
  ) {
    const userId = req.user['id'];
  
    if (!userId) {
      throw new UnauthorizedException('Usuário não encontrado no token.');
    }
  
    return this.favoriteUseCase.executeAdd(userId, dto.productId);
  }

  @Get()
  @UseGuards(JwtAuthGuard) // corrigido aqui também
  async getAll(@Req() req: Request) {
    const userId = req.user['id'];

    if (!userId) {
      throw new UnauthorizedException('Usuário não encontrado no token.');
    }

    return this.favoriteUseCase.executeGet(userId);
  }

  @Delete(':productId')
  @UseGuards(JwtAuthGuard) // corrigido aqui também
  async remove(@Req() req: Request, @Param('productId') productId: string) {
    const userId = req.user['id'];

    if (!userId) {
      throw new UnauthorizedException('Usuário não encontrado no token.');
    }

    return this.favoriteUseCase.executeDelete(userId, productId);
  }
}

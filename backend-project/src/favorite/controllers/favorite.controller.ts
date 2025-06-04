import { Body, Controller, Delete, Get, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateFavoriteDto } from '../dtos/create.favorite.dtos';
import { FavoriteUseCase } from '../use-cases/find-favorites.usecase';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

interface User {
  email: string;
};

@Controller('favorites')
@ApiTags('Favorites')
@ApiBearerAuth()
export class FavoriteController {
  constructor(private readonly favoriteUseCase: FavoriteUseCase) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBody({
    description: 'Adiciona um produto aos favoritos',
    type: CreateFavoriteDto,
    examples: {
      'application/json': {
        value: {
          productId: 'id',
        },
      },
    },
  })
  async add(
    @Req() req: Request  & { user?: User }, 
    @Body() dto: CreateFavoriteDto,
  ) {
    console.log('User:', req.user);

    const userEmail = req.user['email'];
  
    if (!userEmail) {
      throw new UnauthorizedException('Usuário não encontrado no token.');
    }
  
    return this.favoriteUseCase.executeAdd(userEmail, dto.productId);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAll(@Req() req: Request  & { user?: User }) {
    const userEmail = req.user['email'];

    if (!userEmail) {
      throw new UnauthorizedException('Usuário não encontrado no token.');
    }

    return this.favoriteUseCase.executeGet(userEmail);
  }

  @Delete(':productId')
  @UseGuards(AuthGuard)
  async remove(@Req() req: Request  & { user?: User }, @Param('productId') productId: string) {
    const userEmail = req.user['email'];

    if (!userEmail) {
      throw new UnauthorizedException('Usuário não encontrado no token.');
    }

    return this.favoriteUseCase.executeDelete(userEmail, productId);
  }
}

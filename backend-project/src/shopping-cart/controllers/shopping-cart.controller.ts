import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, HttpStatus, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiBearerAuth, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CreateShoppingCartDto } from '../dto/create.shopping-cart.dto';
import { UpdateShoppingCartDto } from '../dto/update.shopping-cart.dto';
import { ShoppingCart } from '../schemas/shopping-cart.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('shopping-cart')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Shopping Cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  /**
   * Endpoint POST para criar um novo carrinho de compras.
   * @param createShoppingCartDto Os dados para criação do carrinho de compras.
   * @returns O carrinho de compras criado.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new shopping cart' })
  @ApiResponse({ status: 201, description: 'The shopping cart has been successfully created.', type: ShoppingCart })
  @ApiBadRequestResponse({ description: 'Bad request: Invalid data provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error while creating shopping cart' })
  async create(@Body() createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
    try {
      return await this.shoppingCartService.create(createShoppingCartDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Internal server error while creating shopping cart');
      }
    }
  }

  /**
   * Endpoint GET para obter todos os carrinhos de compras.
   * @returns Uma matriz de todos os carrinhos de compras existentes.
   */
  @Get()
  @ApiOperation({ summary: 'Get all shopping carts' })
  @ApiResponse({ status: 200, description: 'Returns all shopping carts.', type: ShoppingCart, isArray: true })
  @ApiInternalServerErrorResponse({ description: 'Internal server error while fetching shopping carts' })
  async findAll(): Promise<ShoppingCart[]> {
    try {
      return await this.shoppingCartService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Internal server error while fetching shopping carts');
    }
  }

  /**
   * Endpoint GET para obter um carrinho de compras pelo ID.
   * @param id O ID do carrinho de compras a ser recuperado.
   * @returns O carrinho de compras correspondente ao ID fornecido.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a shopping cart by ID' })
  @ApiResponse({ status: 200, description: 'Returns the shopping cart with the specified ID.', type: ShoppingCart })
  @ApiNotFoundResponse({ description: 'Shopping cart not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error while fetching shopping cart' })
  async findOne(@Param('id') id: string): Promise<ShoppingCart> {
    try {
      const shoppingCart = await this.shoppingCartService.findOne(id);
      if (!shoppingCart) {
        throw new NotFoundException('Shopping cart not found');
      }
      return shoppingCart;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Internal server error while fetching shopping cart');
      }
    }
  }

  /**
   * Endpoint PATCH para atualizar um carrinho de compras pelo ID.
   * @param id O ID do carrinho de compras a ser atualizado.
   * @param updateShoppingCartDto Os dados para atualização do carrinho de compras.
   * @returns O carrinho de compras atualizado.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update a shopping cart by ID' })
  @ApiResponse({ status: 200, description: 'Returns the updated shopping cart.', type: ShoppingCart })
  @ApiNotFoundResponse({ description: 'Shopping cart not found.' })
  @ApiBadRequestResponse({ description: 'Bad request: Invalid data provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error while updating shopping cart' })
  async update(@Param('id') id: string, @Body() updateShoppingCartDto: UpdateShoppingCartDto): Promise<ShoppingCart> {
    try {
      const updatedShoppingCart = await this.shoppingCartService.update(id, updateShoppingCartDto);
      if (!updatedShoppingCart) {
        throw new NotFoundException('Shopping cart not found');
      }
      return updatedShoppingCart;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Internal server error while updating shopping cart');
      }
    }
  }

  /**
   * Endpoint DELETE para excluir um carrinho de compras pelo ID.
   * @param id O ID do carrinho de compras a ser excluído.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a shopping cart by ID' })
  @ApiResponse({ status: 200, description: 'Shopping cart has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Shopping cart not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error while removing shopping cart' })
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.shoppingCartService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Internal server error while removing shopping cart');
      }
    }
  }
}

// shopping-cart.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CreateShoppingCartDto } from '../dto/create.shopping-cart.dto';
import { UpdateShoppingCartDto } from '../dto/update.shopping-cart.dto';
import { ShoppingCart } from '../schemas/shopping-cart.schema';

@Controller('shopping-cart')
@ApiTags('Shopping Cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shopping cart' })
  @ApiResponse({ status: 201, description: 'The shopping cart has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad request: Invalid data provided.' })
  create(@Body() createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
    return this.shoppingCartService.create(createShoppingCartDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all shopping carts' })
  @ApiResponse({ status: 200, description: 'Returns all shopping carts.' })
  findAll(): Promise<ShoppingCart[]> {
    return this.shoppingCartService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a shopping cart by ID' })
  @ApiResponse({ status: 200, description: 'Returns the shopping cart with the specified ID.' })
  @ApiNotFoundResponse({ description: 'Shopping cart not found.' })
  findOne(@Param('id') id: string): Promise<ShoppingCart> {
    return this.shoppingCartService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a shopping cart by ID' })
  @ApiResponse({ status: 200, description: 'Returns the updated shopping cart.' })
  @ApiNotFoundResponse({ description: 'Shopping cart not found.' })
  @ApiBadRequestResponse({ description: 'Bad request: Invalid data provided.' })
  update(@Param('id') id: string, @Body() updateShoppingCartDto: UpdateShoppingCartDto): Promise<ShoppingCart> {
    return this.shoppingCartService.update(id, updateShoppingCartDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a shopping cart by ID' })
  @ApiResponse({ status: 200, description: 'Shopping cart has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Shopping cart not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.shoppingCartService.remove(id);
  }
}

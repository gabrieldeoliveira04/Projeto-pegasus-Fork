import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create.shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update.shopping-cart.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('shopping-cart')
@ApiTags('Shopping Cart') // Adiciona uma tag para o controlador na documentação Swagger
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shopping cart' }) // Descreve a operação na documentação Swagger
  @ApiResponse({ status: 201, description: 'The shopping cart has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad request: Invalid data provided.' })
  create(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.create(createShoppingCartDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all shopping carts' }) // Descreve a operação na documentação Swagger
  @ApiResponse({ status: 200, description: 'Returns all shopping carts.' })
  findAll() {
    return this.shoppingCartService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a shopping cart by ID' }) // Descreve a operação na documentação Swagger
  @ApiResponse({ status: 200, description: 'Returns the shopping cart with the specified ID.' })
  @ApiNotFoundResponse({ description: 'Shopping cart not found.' })
  findOne(@Param('id') id: string) {
    return this.shoppingCartService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a shopping cart by ID' }) // Descreve a operação na documentação Swagger
  @ApiResponse({ status: 200, description: 'Returns the updated shopping cart.' })
  @ApiNotFoundResponse({ description: 'Shopping cart not found.' })
  @ApiBadRequestResponse({ description: 'Bad request: Invalid data provided.' })
  update(@Param('id') id: string, @Body() updateShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.update(id, updateShoppingCartDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a shopping cart by ID' }) // Descreve a operação na documentação Swagger
  @ApiResponse({ status: 200, description: 'Shopping cart has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Shopping cart not found.' })
  remove(@Param('id') id: string) {
    return this.shoppingCartService.remove(id);
  }
}

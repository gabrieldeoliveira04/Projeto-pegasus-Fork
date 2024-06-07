import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create.catalog.dto';
import { UpdateCatalogDto } from './dto/update.catalog.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('catalog')
@ApiTags('Catalog') // Adiciona uma tag para o controlador na documentação Swagger
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post()
  @ApiOperation({ summary: 'Create new catalog items' }) // Descreve a operação na documentação Swagger
  @ApiResponse({ status: 201, description: 'The catalog items have been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad request: Invalid data provided.' })
  create(@Body() createCatalogDtos: CreateCatalogDto[]) {
    return this.catalogService.create(createCatalogDtos);
  }

  @Get()
  @ApiOperation({ summary: 'Get all catalog items' }) // Descreve a operação na documentação Swagger
  @ApiResponse({ status: 200, description: 'Returns all catalog items.' })
  findAll() {
    return this.catalogService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a catalog item by ID' }) // Descreve a operação na documentação Swagger
  @ApiResponse({ status: 200, description: 'Returns the catalog item with the specified ID.' })
  @ApiNotFoundResponse({ description: 'Catalog item not found.' })
  findOne(@Param('id') id: string) {
    return this.catalogService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a catalog item by ID' }) // Descreve a operação na documentação Swagger
  @ApiResponse({ status: 200, description: 'Returns the updated catalog item.' })
  @ApiNotFoundResponse({ description: 'Catalog item not found.' })
  @ApiBadRequestResponse({ description: 'Bad request: Invalid data provided.' })
  update(@Param('id') id: string, @Body() updateCatalogDto: UpdateCatalogDto) {
    return this.catalogService.update(id, updateCatalogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a catalog item by ID' }) // Descreve a operação na documentação Swagger
  @ApiResponse({ status: 200, description: 'Catalog item has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Catalog item not found.' })
  remove(@Param('id') id: string) {
    return this.catalogService.remove(id);
  }
}

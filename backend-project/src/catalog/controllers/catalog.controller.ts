import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Catalog } from '../schemas/catalog.schema';
import { CreateCatalogDto } from '../dtos/create.catalog.dto';
import { UpdateCatalogDto } from '../dtos/update.catalog.dto';
import { CatalogService } from '../services/catalog.service';
import { CatalogGuard } from '../catalog.guard';

@Controller('catalog')
@ApiBearerAuth() // Especifica que a autenticação é necessária para todas as rotas do controlador
//@UseGuards(CatalogGuard) // Usa o guarda de usuário em todas as rotas do controlador
@ApiTags('Catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post()
  @ApiOperation({ summary: 'Create new catalog item(s)' })
  @ApiBody({ type: CreateCatalogDto }) // Aceita um único CreateCatalogDto
  @ApiBody({ type: [CreateCatalogDto] }) // Aceita um array de CreateCatalogDto
  @ApiResponse({ status: 201, description: 'The catalog item(s) have been successfully created.', type: Catalog, isArray: true })
  @ApiBadRequestResponse({ description: 'Bad request: Invalid data provided.' })
  async create(@Body() createDto: CreateCatalogDto | CreateCatalogDto[]): Promise<Catalog | Catalog[]> {
    try {
      if (Array.isArray(createDto)) {
        const createdCatalogs = await Promise.all(createDto.map(dto => this.catalogService.create(dto)));
        return createdCatalogs;
      } else {
        const createdCatalog = await this.catalogService.create(createDto);
        return createdCatalog;
      }
    } catch (error) {
      // Captura e trata erros de validação do Mongoose
      if (error.name === 'ValidationError') {
        throw new HttpException({ message: 'Validation failed', errors: error.errors }, HttpStatus.BAD_REQUEST);
      }
      // Outros tipos de erros podem ser tratados aqui
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all catalog items' })
  @ApiResponse({ status: 200, description: 'Returns all catalog items.', type: Catalog, isArray: true })
  async findAll(): Promise<Catalog[]> {
    return this.catalogService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a catalog item by ID' })
  @ApiResponse({ status: 200, description: 'Returns the catalog item with the specified ID.', type: Catalog })
  @ApiNotFoundResponse({ description: 'Catalog item not found.' })
  async findOne(@Param('id') id: string): Promise<Catalog> {
    return this.catalogService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a catalog item by ID' })
  @ApiResponse({ status: 200, description: 'Returns the updated catalog item.', type: Catalog })
  @ApiNotFoundResponse({ description: 'Catalog item not found.' })
  @ApiBadRequestResponse({ description: 'Bad request: Invalid data provided.' })
  async update(@Param('id') id: string, @Body() updateCatalogDto: UpdateCatalogDto): Promise<Catalog> {
    try {
      const updatedCatalog = await this.catalogService.update(id, updateCatalogDto);
      return updatedCatalog;
    } catch (error) {
      // Captura e trata erros de validação do Mongoose
      if (error.name === 'ValidationError') {
        throw new HttpException({ message: 'Validation failed', errors: error.errors }, HttpStatus.BAD_REQUEST);
      }
      // Outros tipos de erros podem ser tratados aqui
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a catalog item by ID' })
  @ApiResponse({ status: 200, description: 'Catalog item has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Catalog item not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.catalogService.remove(id);
    } catch (error) {
      // Captura e trata erros de validação do Mongoose
      if (error.name === 'ValidationError') {
        throw new HttpException({ message: 'Validation failed', errors: error.errors }, HttpStatus.BAD_REQUEST);
      }
      // Outros tipos de erros podem ser tratados aqui
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

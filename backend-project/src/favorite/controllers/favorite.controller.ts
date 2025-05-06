import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, UseGuards, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiBody, ApiBearerAuth, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { Catalog } from '../schemas/catalog.schema';
import { CreateCatalogDto } from '../dtos/create.catalog.dto';
import { CatalogService } from '../services/catalog.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('catalog')
@ApiTags('Catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post()
  @ApiOperation({ summary: 'Create new catalog item(s)' })
  @ApiBody({ type: CreateCatalogDto, isArray: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'The catalog item(s) have been successfully created.', type: Catalog, isArray: true })
  @ApiBadRequestResponse({ description: 'Bad request: Invalid data provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error while creating catalog item(s)' })
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
      if (error.name === 'ValidationError') {
        throw new HttpException({ message: 'Validation failed', errors: error.errors }, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Internal server error while creating catalog item(s)', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all catalog items' })
  @ApiResponse({ status: 200, description: 'Returns all catalog items.', type: Catalog, isArray: true })
  @ApiInternalServerErrorResponse({ description: 'Internal server error while fetching catalog items' })
  async findAll(): Promise<Catalog[]> {
    try {
      return this.catalogService.findAll();
    } catch (error) {
      throw new HttpException('Internal server error while fetching catalog items', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a catalog item by ID' })
  @ApiResponse({ status: 200, description: 'Returns the catalog item with the specified ID.', type: Catalog })
  @ApiNotFoundResponse({ description: 'Catalog item not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error while fetching catalog item' })
  async findOne(@Param('id') id: string): Promise<Catalog> {
    try {
      const catalogItem = await this.catalogService.findOne(id);
      if (!catalogItem) {
        throw new NotFoundException('Catalog item not found');
      }
      return catalogItem;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Internal server error while fetching catalog item');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a catalog item by ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Catalog item has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Catalog item not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error while removing catalog item' })
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.catalogService.delete(id);
    } catch (error) {
      throw new HttpException('Internal server error while removing catalog item', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

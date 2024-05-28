import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create.transaction.dto';
import { UpdateTransactionDto } from './dto/update.transaction.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger'; // Importe as anotações do Swagger

@ApiTags('Transactions') // Define as tags do Swagger para este controlador
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionsService: TransactionService) {}

  @ApiOperation({ summary: 'Create a new transaction' }) // Adiciona uma descrição à operação
  @ApiBody({ type: CreateTransactionDto }) // Define o tipo de corpo esperado
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @ApiOperation({ summary: 'Get all transactions' }) // Adiciona uma descrição à operação
  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @ApiOperation({ summary: 'Get a transaction by ID' }) // Adiciona uma descrição à operação
  @ApiParam({ name: 'id', description: 'Transaction ID' }) // Define o parâmetro da rota
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a transaction by ID' }) // Adiciona uma descrição à operação
  @ApiParam({ name: 'id', description: 'Transaction ID' }) // Define o parâmetro da rota
  @ApiBody({ type: UpdateTransactionDto }) // Define o tipo de corpo esperado
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: CreateTransactionDto) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @ApiOperation({ summary: 'Delete a transaction by ID' }) // Adiciona uma descrição à operação
  @ApiParam({ name: 'id', description: 'Transaction ID' }) // Define o parâmetro da rota
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}

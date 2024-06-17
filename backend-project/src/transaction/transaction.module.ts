import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './schemas/transaction.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }])],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService, MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }])],
})
export class TransactionModule {}

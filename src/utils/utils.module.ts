import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';

@Module({
  exports: [UtilsService],
  controllers: [],
  providers: [UtilsService],
})
export class UtilsModule {}

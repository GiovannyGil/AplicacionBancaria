import { Module } from '@nestjs/common';
import { DashService } from './dash.service';
import { DashController } from './dash.controller';

@Module({
  controllers: [DashController],
  providers: [DashService],
})
export class DashModule {}

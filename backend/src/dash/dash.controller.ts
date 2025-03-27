import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DashService } from './dash.service';
import { CreateDashDto } from './dto/create-dash.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('dash')
@UseGuards(JwtAuthGuard)
export class DashController {
  constructor(private readonly dashService: DashService) {}

}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DashService } from './dash.service';
import { CreateDashDto } from './dto/create-dash.dto';
import { UpdateDashDto } from './dto/update-dash.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('dash')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashController {
  constructor(private readonly dashService: DashService) {}

}

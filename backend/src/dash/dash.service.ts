import { Injectable } from '@nestjs/common';
import { CreateDashDto } from './dto/create-dash.dto';
import { UpdateDashDto } from './dto/update-dash.dto';

@Injectable()
export class DashService {
  create(createDashDto: CreateDashDto) {
    return 'This action adds a new dash';
  }

  findAll() {
    return `This action returns all dash`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dash`;
  }

  update(id: number, updateDashDto: UpdateDashDto) {
    return `This action updates a #${id} dash`;
  }

  remove(id: number) {
    return `This action removes a #${id} dash`;
  }
}

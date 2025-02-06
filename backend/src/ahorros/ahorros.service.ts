import { Injectable } from '@nestjs/common';
import { CreateAhorroDto } from './dto/create-ahorro.dto';
import { UpdateAhorroDto } from './dto/update-ahorro.dto';

@Injectable()
export class AhorrosService {
  create(createAhorroDto: CreateAhorroDto) {
    return 'This action adds a new ahorro';
  }

  findAll() {
    return `This action returns all ahorros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ahorro`;
  }

  update(id: number, updateAhorroDto: UpdateAhorroDto) {
    return `This action updates a #${id} ahorro`;
  }

  remove(id: number) {
    return `This action removes a #${id} ahorro`;
  }
}

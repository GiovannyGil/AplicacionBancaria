import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { Gasto } from './entities/gasto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GastosService {
  constructor(
    @InjectRepository(Gasto) private gastoRepository: Repository<Gasto>
  ) {}
  async create(createGastoDto: CreateGastoDto) {
    try {
      const gasto = this.gastoRepository.create(createGastoDto);
      if (!gasto) throw new InternalServerErrorException('No se pudo crear el gasto.');
      return await this.gastoRepository.save(gasto);
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el gasto: ${error.message}`);
    }
  }

  async findAll(): Promise<Gasto[]> {
    try {
      const gastos = await this.gastoRepository.find();
      if (!gastos) throw new InternalServerErrorException('No se encontraron gastos.');
      return gastos;
    } catch (error) {
      throw new InternalServerErrorException(`Error al buscar los gastos: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Gasto> {
    try {
      const gasto = await this.gastoRepository.findOneBy({id});
      if (!gasto) throw new InternalServerErrorException('No se encontró el gasto.');
      return gasto;
    } catch (error) {
      throw new InternalServerErrorException(`Error al buscar el gasto: ${error.message}`);     
    }
  }

  async update(id: number, updateGastoDto: UpdateGastoDto) {
    try {
      const gasto = await this.findOne(id);
      if (!gasto) throw new InternalServerErrorException('No se encontró el gasto.');
      const gastoActualizado = await this.gastoRepository.update({ id: gasto.id }, updateGastoDto);
      if (!gastoActualizado) throw new InternalServerErrorException('No se pudo actualizar el gasto.');
      return gastoActualizado;
    } catch (error) {
      throw new InternalServerErrorException(`Error al actualizar el gasto: ${error.message}`);
    }
  }

  async remove(id: number) {
   try {
      const gasto = await this.gastoRepository.findOneBy({ id });
      if (!gasto) throw new InternalServerErrorException('No se encontró el gasto.');
      const gastoEliminado = await this.gastoRepository.delete({ id: gasto.id });
      if (!gastoEliminado) throw new InternalServerErrorException('No se pudo eliminar el gasto.');
      return gastoEliminado;
   } catch (error) {
     throw new InternalServerErrorException(`Error al eliminar el gasto: ${error.message}`);    
   }
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import { Tarjeta } from './entities/tarjeta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TarjetasService {

  constructor(
      @InjectRepository(Tarjeta) private tarjetaRepository: Repository<Tarjeta>
    ) {}
    
  async create(createTarjetaDto: CreateTarjetaDto): Promise<Tarjeta> {
    try {
      const tarjeta = this.tarjetaRepository.create(createTarjetaDto);
      if (!tarjeta) throw new InternalServerErrorException('No se pudo crear la tarjeta.');
      return await this.tarjetaRepository.save(tarjeta);
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear la tarjeta: ${error.message}`);
    }
  }

  async findAll():Promise<Tarjeta[]> {
    try {
      const tarjetas = await this.tarjetaRepository.find();
      if (!tarjetas) throw new InternalServerErrorException('No se encontraron tarjetas registradas.');
      return tarjetas;
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear la tarjeta: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Tarjeta> {
    try {
      const tarjeta = await this.tarjetaRepository.findOneBy({id});
      if (!tarjeta) throw new InternalServerErrorException('No se encontraro tarjeta registrada.');
      return tarjeta;
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear la tarjeta: ${error.message}`);
    }
  }

  async update(id: number, updateTarjetaDto: UpdateTarjetaDto) {
    try {
      const tarjeta = await this.findOne(id);
      if (!tarjeta) throw new InternalServerErrorException('No se encontraro tarjeta registrada.');
      const tarjetaActualizada = await this.tarjetaRepository.update({ id: tarjeta.id }, updateTarjetaDto);
      if (!tarjetaActualizada) throw new InternalServerErrorException('No se pudo actualizar la tarjeta.');
      return tarjetaActualizada;
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear la tarjeta: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const tarjeta = await this.tarjetaRepository.findOneBy({ id });
      if (!tarjeta) throw new InternalServerErrorException('No se encontraro tarjeta registrada.');
      const eliminarTarjeta = await this.tarjetaRepository.remove(tarjeta);
      if (!eliminarTarjeta) throw new InternalServerErrorException('No se pudo eliminar la tarjeta.');
      return eliminarTarjeta;
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear la tarjeta: ${error.message}`);
    }
  }
}

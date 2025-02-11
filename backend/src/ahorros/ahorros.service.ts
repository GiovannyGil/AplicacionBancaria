import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAhorroDto } from './dto/create-ahorro.dto';
import { UpdateAhorroDto } from './dto/update-ahorro.dto';
import { Ahorro } from './entities/ahorro.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class AhorrosService {
  constructor(
        @InjectRepository(Ahorro) private ahorroRepository: Repository<Ahorro>,
        @InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>,
      ) {}

  async create(createAhorroDto: CreateAhorroDto):Promise<Ahorro> {
    const { usuarioID } = createAhorroDto;
    try {
      // verificar que el usuario existe
      const usuario = await this.usuariosRepository.findOne({ where: {id: usuarioID, deletedAt: null} })
      if(!usuario) throw new NotFoundException('Usuario no encontrado')

      // crear Ahorro
      const ahorro = this.ahorroRepository.create(createAhorroDto);
      if (!ahorro) throw new InternalServerErrorException('No se pudo crear el ahorro.');

      const guardarAhorro = await this.ahorroRepository.save(ahorro);
      if (!guardarAhorro) throw new InternalServerErrorException('No se pudo guardar el ahorro.');

      return guardarAhorro;
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el ahorro: ${error.message}`);
    }
  }

  async findAll(): Promise<Ahorro[]> {
    try {
      const ahorros = await this.ahorroRepository.find({ where: {deletedAt: null}, relations: ['usuario'] });
      if (!ahorros) throw new InternalServerErrorException('No se encontraron ahorros.');
      return ahorros;
    } catch (error) {
      throw new InternalServerErrorException(`Error al buscar los ahorros: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Ahorro> {
    try {
      const ahorro = await this.ahorroRepository.findOne({ where: {id, deletedAt: null}, relations: [ 'usuario'] });
      if (!ahorro) throw new InternalServerErrorException('No se encontró el ahorro.');
      return ahorro;
    } catch (error) {
      throw new InternalServerErrorException(`Error al buscar el ahorro: ${error.message}`);
    }
  }

  async update(id: number, updateAhorroDto: UpdateAhorroDto) {
    try {
      return `This action updates a #${id} ahorro`;
    } catch (error) {
      throw new InternalServerErrorException(`Error al actualizar el ahorro: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const ahorro = await this.ahorroRepository.findOneBy({ id });
      if (!ahorro) throw new InternalServerErrorException('No se encontró el ahorro.');
      const ahorroEliminado = await this.ahorroRepository.delete({ id: ahorro.id });
      if (!ahorroEliminado) throw new InternalServerErrorException('No se pudo eliminar el ahorro.');
      return ahorroEliminado;
    } catch (error) {
      throw new InternalServerErrorException(`Error al eliminar el ahorro: ${error.message}`);      
    }
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  async create(createUsuarioDto: CreateUsuarioDto) {
    return await 'This action adds a new usuario';
  }

  async findAll() {
    return await `This action returns all usuarios`;
  }

  async findOneByID(id: number) {
    return await `This action returns a #${id} usuario`;
  }

  async findOneByName(name: string) {
    return await `This action returns a #${name} usuario`;
  }

  async findOneByEmail(email: string) {
    return await `This action returns a #${email} usuario`;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return await `This action updates a #${id} usuario`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} usuario`;
  }
}

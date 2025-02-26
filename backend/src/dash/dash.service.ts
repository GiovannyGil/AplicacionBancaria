import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateDashDto } from './dto/create-dash.dto';
import { UpdateDashDto } from './dto/update-dash.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Gasto } from 'src/gastos/entities/gasto.entity';
import { Ahorro } from 'src/ahorros/entities/ahorro.entity';
import { Credito } from 'src/creditos/entities/credito.entity';
import { Tarjeta } from 'src/tarjetas/entities/tarjeta.entity';
import { Transaccion } from 'src/tarjetas/entities/transacciones.entity';
import { Observable } from 'rxjs';

@Injectable()
export class DashService {
    event$: any;
    constructor(
        @InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>,
        @InjectRepository(Transaccion) private readonly transactionRepo: Repository<Transaccion>,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
        @InjectRepository(Gasto) private readonly gastoRepository: Repository<Gasto>,
        @InjectRepository(Ahorro) private readonly ahorroRepository: Repository<Ahorro>,
        @InjectRepository(Credito) private readonly creditoRepository: Repository<Credito>,
        @InjectRepository(Tarjeta) private readonly tarjetaRepository: Repository<Tarjeta>,
    ) {}

   // usuarios
    async CantidadUsuarios(): Promise<number> {
      try {
        return this.usuarioRepository.count();
      } catch (error) {
        throw new BadGatewayException(`No se pudo obtener la cantidad de usuarios`);
      }
    }

    // roles
    async CantidadRoles(): Promise<number> {
      try {
        return this.roleRepository.count();
      } catch (error) {
        throw new BadGatewayException(`No se pudo obtener la cantidad de roles`);
      }
    }

    /**Cantidad Usuarios por cada ROL */
    async CantidadUsuariosporROl(): Promise<any> {
        try {
            const Roles = await this.roleRepository.find();
            const data = [];
            for (const rol of Roles) {
                const cantidad = await this.usuarioRepository.count({ where: { rol: rol } });
                data.push({ rol: rol.nombreRol, cantidad });
            }
            return data;
        } catch (error) {
            throw new BadGatewayException(`No se pudo obtener la cantidad de usuarios por rol`);
        }
    }

    // transacciones    
    async obtenerTransacciones(): Promise<number> {
      return this.transactionRepo.count();
    }
    /** cantidad de transacciones por tarjeta */
    async obtenerTransaccionesporTarjeta(): Promise<any> {
        try {
            const usuarios = await this.usuarioRepository.find();
            const data = [];
            for (const user of usuarios) { const cantidad = await this.transactionRepo.count({
                where: { tarjeta: { usuario: user } },
            }); }
            return data;
        } catch (error) {
            throw new BadGatewayException(`No se pudo obtener la cantidad de transacciones por usuario`);
        }
    }

    // gastos
    async obtenerGastos(): Promise<number> {
      return this.gastoRepository.count();
    }
    /** obtener la cantidad de gastos de cada usuario */
    async obtenerGastosporUsuario(): Promise<any> {
        try {
            const usuarios = await this.usuarioRepository.find();
            const data = [];
            for (const user of usuarios) {
                const cantidad = await this.gastoRepository.count({ where: { usuario: user } });
                data.push({ usuario: user.nombreUsuario, cantidad });
            }
            return data;
        } catch (error) {
            throw new BadGatewayException(`No se pudo obtener la cantidad de gastos por usuario`);
        }
    }
    /** suma de los gastos del usuario logeado */
    async obtenerTotalGastos(): Promise<number> {
        try {
            const gastos = await this.gastoRepository.find();
            let total = 0;
            for (const gasto of gastos) {
                total += gasto.valorPago;
            }
            return total;
        } catch (error) {
            throw new BadGatewayException(`No se pudo obtener el total de gastos`);
        }
    }
    
    // ahorros
    async obtenerAhorros(): Promise<number> {
      return this.ahorroRepository.count();
    }
    /** suma de los ahorro del usuario logeado */
    async obtenerTotalAhorros(): Promise<number> {
        try {
            const ahorros = await this.ahorroRepository.find();
            let total = 0;
            for (const ahorro of ahorros) {
                total += ahorro.ahorroMensual;
            }
            return total;
        } catch (error) {
            throw new BadGatewayException(`No se pudo obtener el total de ahorros`);
        }
    }

    // creditos
    async obtenerCreditos(): Promise<number> {
      return this.creditoRepository.count();
    }
    /** suma de los creditos del usuario logeado */
    async obtenerTotalCreditos(): Promise<number> {
        try {
            const creditos = await this.creditoRepository.find();
            let total = 0;
            for (const credito of creditos) {
                total += credito.montoFinal;
            }
            return total;
        } catch (error) {
            throw new BadGatewayException(`No se pudo obtener el total de creditos`);
        }
    }

    // tarjetas
    async obtenerTarjetas(): Promise<number> {
      return this.tarjetaRepository.count();
    }
    /** obtener la cantidad de tarjetas de cada usuario */
    async obtenerTarjetasporUsuario(): Promise<any> {
        try {
            const usuarios = await this.usuarioRepository.find();
            const data = [];
            for (const user of usuarios) {
                const cantidad = await this.tarjetaRepository.count({ where: { usuario: user } });
                data.push({ usuario: user.nombreUsuario, cantidad });
            }
            return data;
        } catch (error) {
            throw new BadGatewayException(`No se pudo obtener la cantidad de tarjetas por usuario`);
        }
    }

    //
    onDashboardUpdate(): Observable<any> {
      return this.event$.onUpdate();
    }
}

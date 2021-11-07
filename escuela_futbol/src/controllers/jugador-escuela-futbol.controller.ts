import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Jugador,
  EscuelaFutbol,
} from '../models';
import {JugadorRepository} from '../repositories';

export class JugadorEscuelaFutbolController {
  constructor(
    @repository(JugadorRepository)
    public jugadorRepository: JugadorRepository,
  ) { }

  @get('/jugadors/{id}/escuela-futbol', {
    responses: {
      '200': {
        description: 'EscuelaFutbol belonging to Jugador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EscuelaFutbol)},
          },
        },
      },
    },
  })
  async getEscuelaFutbol(
    @param.path.string('id') id: typeof Jugador.prototype.id,
  ): Promise<EscuelaFutbol> {
    return this.jugadorRepository.escuelaFutbol(id);
  }
}

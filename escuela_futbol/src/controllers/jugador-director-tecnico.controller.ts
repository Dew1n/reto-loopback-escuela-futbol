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
  DirectorTecnico,
} from '../models';
import {JugadorRepository} from '../repositories';

export class JugadorDirectorTecnicoController {
  constructor(
    @repository(JugadorRepository)
    public jugadorRepository: JugadorRepository,
  ) { }

  @get('/jugadors/{id}/director-tecnico', {
    responses: {
      '200': {
        description: 'DirectorTecnico belonging to Jugador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DirectorTecnico)},
          },
        },
      },
    },
  })
  async getDirectorTecnico(
    @param.path.string('id') id: typeof Jugador.prototype.id,
  ): Promise<DirectorTecnico> {
    return this.jugadorRepository.directorTecnico(id);
  }
}

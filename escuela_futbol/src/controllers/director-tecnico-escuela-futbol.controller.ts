import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DirectorTecnico,
  EscuelaFutbol,
} from '../models';
import {DirectorTecnicoRepository} from '../repositories';

export class DirectorTecnicoEscuelaFutbolController {
  constructor(
    @repository(DirectorTecnicoRepository)
    public directorTecnicoRepository: DirectorTecnicoRepository,
  ) { }

  @get('/director-tecnicos/{id}/escuela-futbol', {
    responses: {
      '200': {
        description: 'EscuelaFutbol belonging to DirectorTecnico',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EscuelaFutbol)},
          },
        },
      },
    },
  })
  async getEscuelaFutbol(
    @param.path.string('id') id: typeof DirectorTecnico.prototype.id,
  ): Promise<EscuelaFutbol> {
    return this.directorTecnicoRepository.escuelaFutbol(id);
  }
}

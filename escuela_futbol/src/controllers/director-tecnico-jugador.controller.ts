import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  DirectorTecnico,
  Jugador,
} from '../models';
import {DirectorTecnicoRepository} from '../repositories';

export class DirectorTecnicoJugadorController {
  constructor(
    @repository(DirectorTecnicoRepository) protected directorTecnicoRepository: DirectorTecnicoRepository,
  ) { }

  @get('/director-tecnicos/{id}/jugadors', {
    responses: {
      '200': {
        description: 'Array of DirectorTecnico has many Jugador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jugador)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Jugador>,
  ): Promise<Jugador[]> {
    return this.directorTecnicoRepository.jugadors(id).find(filter);
  }

  @post('/director-tecnicos/{id}/jugadors', {
    responses: {
      '200': {
        description: 'DirectorTecnico model instance',
        content: {'application/json': {schema: getModelSchemaRef(Jugador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DirectorTecnico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jugador, {
            title: 'NewJugadorInDirectorTecnico',
            exclude: ['id'],
            optional: ['directorTecnicoId']
          }),
        },
      },
    }) jugador: Omit<Jugador, 'id'>,
  ): Promise<Jugador> {
    return this.directorTecnicoRepository.jugadors(id).create(jugador);
  }

  @patch('/director-tecnicos/{id}/jugadors', {
    responses: {
      '200': {
        description: 'DirectorTecnico.Jugador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jugador, {partial: true}),
        },
      },
    })
    jugador: Partial<Jugador>,
    @param.query.object('where', getWhereSchemaFor(Jugador)) where?: Where<Jugador>,
  ): Promise<Count> {
    return this.directorTecnicoRepository.jugadors(id).patch(jugador, where);
  }

  @del('/director-tecnicos/{id}/jugadors', {
    responses: {
      '200': {
        description: 'DirectorTecnico.Jugador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Jugador)) where?: Where<Jugador>,
  ): Promise<Count> {
    return this.directorTecnicoRepository.jugadors(id).delete(where);
  }
}

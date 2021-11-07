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
  EscuelaFutbol,
  Jugador,
} from '../models';
import {EscuelaFutbolRepository} from '../repositories';

export class EscuelaFutbolJugadorController {
  constructor(
    @repository(EscuelaFutbolRepository) protected escuelaFutbolRepository: EscuelaFutbolRepository,
  ) { }

  @get('/escuela-futbols/{id}/jugadors', {
    responses: {
      '200': {
        description: 'Array of EscuelaFutbol has many Jugador',
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
    return this.escuelaFutbolRepository.jugadors(id).find(filter);
  }

  @post('/escuela-futbols/{id}/jugadors', {
    responses: {
      '200': {
        description: 'EscuelaFutbol model instance',
        content: {'application/json': {schema: getModelSchemaRef(Jugador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof EscuelaFutbol.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jugador, {
            title: 'NewJugadorInEscuelaFutbol',
            exclude: ['id'],
            optional: ['escuelaFutbolId']
          }),
        },
      },
    }) jugador: Omit<Jugador, 'id'>,
  ): Promise<Jugador> {
    return this.escuelaFutbolRepository.jugadors(id).create(jugador);
  }

  @patch('/escuela-futbols/{id}/jugadors', {
    responses: {
      '200': {
        description: 'EscuelaFutbol.Jugador PATCH success count',
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
    return this.escuelaFutbolRepository.jugadors(id).patch(jugador, where);
  }

  @del('/escuela-futbols/{id}/jugadors', {
    responses: {
      '200': {
        description: 'EscuelaFutbol.Jugador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Jugador)) where?: Where<Jugador>,
  ): Promise<Count> {
    return this.escuelaFutbolRepository.jugadors(id).delete(where);
  }
}

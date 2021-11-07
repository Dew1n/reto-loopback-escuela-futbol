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
  DirectorTecnico,
} from '../models';
import {EscuelaFutbolRepository} from '../repositories';

export class EscuelaFutbolDirectorTecnicoController {
  constructor(
    @repository(EscuelaFutbolRepository) protected escuelaFutbolRepository: EscuelaFutbolRepository,
  ) { }

  @get('/escuela-futbols/{id}/director-tecnicos', {
    responses: {
      '200': {
        description: 'Array of EscuelaFutbol has many DirectorTecnico',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DirectorTecnico)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DirectorTecnico>,
  ): Promise<DirectorTecnico[]> {
    return this.escuelaFutbolRepository.directorTecnicos(id).find(filter);
  }

  @post('/escuela-futbols/{id}/director-tecnicos', {
    responses: {
      '200': {
        description: 'EscuelaFutbol model instance',
        content: {'application/json': {schema: getModelSchemaRef(DirectorTecnico)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof EscuelaFutbol.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DirectorTecnico, {
            title: 'NewDirectorTecnicoInEscuelaFutbol',
            exclude: ['id'],
            optional: ['escuelaFutbolId']
          }),
        },
      },
    }) directorTecnico: Omit<DirectorTecnico, 'id'>,
  ): Promise<DirectorTecnico> {
    return this.escuelaFutbolRepository.directorTecnicos(id).create(directorTecnico);
  }

  @patch('/escuela-futbols/{id}/director-tecnicos', {
    responses: {
      '200': {
        description: 'EscuelaFutbol.DirectorTecnico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DirectorTecnico, {partial: true}),
        },
      },
    })
    directorTecnico: Partial<DirectorTecnico>,
    @param.query.object('where', getWhereSchemaFor(DirectorTecnico)) where?: Where<DirectorTecnico>,
  ): Promise<Count> {
    return this.escuelaFutbolRepository.directorTecnicos(id).patch(directorTecnico, where);
  }

  @del('/escuela-futbols/{id}/director-tecnicos', {
    responses: {
      '200': {
        description: 'EscuelaFutbol.DirectorTecnico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DirectorTecnico)) where?: Where<DirectorTecnico>,
  ): Promise<Count> {
    return this.escuelaFutbolRepository.directorTecnicos(id).delete(where);
  }
}

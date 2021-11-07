import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {EscuelaFutbol} from '../models';
import {EscuelaFutbolRepository} from '../repositories';

export class EscuelaFutbolController {
  constructor(
    @repository(EscuelaFutbolRepository)
    public escuelaFutbolRepository : EscuelaFutbolRepository,
  ) {}

  @post('/escuela-futbols')
  @response(200, {
    description: 'EscuelaFutbol model instance',
    content: {'application/json': {schema: getModelSchemaRef(EscuelaFutbol)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EscuelaFutbol, {
            title: 'NewEscuelaFutbol',
            exclude: ['id'],
          }),
        },
      },
    })
    escuelaFutbol: Omit<EscuelaFutbol, 'id'>,
  ): Promise<EscuelaFutbol> {
    return this.escuelaFutbolRepository.create(escuelaFutbol);
  }

  @get('/escuela-futbols/count')
  @response(200, {
    description: 'EscuelaFutbol model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EscuelaFutbol) where?: Where<EscuelaFutbol>,
  ): Promise<Count> {
    return this.escuelaFutbolRepository.count(where);
  }

  @get('/escuela-futbols')
  @response(200, {
    description: 'Array of EscuelaFutbol model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EscuelaFutbol, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EscuelaFutbol) filter?: Filter<EscuelaFutbol>,
  ): Promise<EscuelaFutbol[]> {
    return this.escuelaFutbolRepository.find(filter);
  }

  @patch('/escuela-futbols')
  @response(200, {
    description: 'EscuelaFutbol PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EscuelaFutbol, {partial: true}),
        },
      },
    })
    escuelaFutbol: EscuelaFutbol,
    @param.where(EscuelaFutbol) where?: Where<EscuelaFutbol>,
  ): Promise<Count> {
    return this.escuelaFutbolRepository.updateAll(escuelaFutbol, where);
  }

  @get('/escuela-futbols/{id}')
  @response(200, {
    description: 'EscuelaFutbol model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EscuelaFutbol, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EscuelaFutbol, {exclude: 'where'}) filter?: FilterExcludingWhere<EscuelaFutbol>
  ): Promise<EscuelaFutbol> {
    return this.escuelaFutbolRepository.findById(id, filter);
  }

  @patch('/escuela-futbols/{id}')
  @response(204, {
    description: 'EscuelaFutbol PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EscuelaFutbol, {partial: true}),
        },
      },
    })
    escuelaFutbol: EscuelaFutbol,
  ): Promise<void> {
    await this.escuelaFutbolRepository.updateById(id, escuelaFutbol);
  }

  @put('/escuela-futbols/{id}')
  @response(204, {
    description: 'EscuelaFutbol PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() escuelaFutbol: EscuelaFutbol,
  ): Promise<void> {
    await this.escuelaFutbolRepository.replaceById(id, escuelaFutbol);
  }

  @del('/escuela-futbols/{id}')
  @response(204, {
    description: 'EscuelaFutbol DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.escuelaFutbolRepository.deleteById(id);
  }
}

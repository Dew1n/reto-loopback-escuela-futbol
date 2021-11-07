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
import {DirectorTecnico} from '../models';
import {DirectorTecnicoRepository} from '../repositories';

export class DirectorTecnicoController {
  constructor(
    @repository(DirectorTecnicoRepository)
    public directorTecnicoRepository : DirectorTecnicoRepository,
  ) {}

  @post('/director-tecnicos')
  @response(200, {
    description: 'DirectorTecnico model instance',
    content: {'application/json': {schema: getModelSchemaRef(DirectorTecnico)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DirectorTecnico, {
            title: 'NewDirectorTecnico',
            exclude: ['id'],
          }),
        },
      },
    })
    directorTecnico: Omit<DirectorTecnico, 'id'>,
  ): Promise<DirectorTecnico> {
    return this.directorTecnicoRepository.create(directorTecnico);
  }

  @get('/director-tecnicos/count')
  @response(200, {
    description: 'DirectorTecnico model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DirectorTecnico) where?: Where<DirectorTecnico>,
  ): Promise<Count> {
    return this.directorTecnicoRepository.count(where);
  }

  @get('/director-tecnicos')
  @response(200, {
    description: 'Array of DirectorTecnico model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DirectorTecnico, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DirectorTecnico) filter?: Filter<DirectorTecnico>,
  ): Promise<DirectorTecnico[]> {
    return this.directorTecnicoRepository.find(filter);
  }

  @patch('/director-tecnicos')
  @response(200, {
    description: 'DirectorTecnico PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DirectorTecnico, {partial: true}),
        },
      },
    })
    directorTecnico: DirectorTecnico,
    @param.where(DirectorTecnico) where?: Where<DirectorTecnico>,
  ): Promise<Count> {
    return this.directorTecnicoRepository.updateAll(directorTecnico, where);
  }

  @get('/director-tecnicos/{id}')
  @response(200, {
    description: 'DirectorTecnico model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DirectorTecnico, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DirectorTecnico, {exclude: 'where'}) filter?: FilterExcludingWhere<DirectorTecnico>
  ): Promise<DirectorTecnico> {
    return this.directorTecnicoRepository.findById(id, filter);
  }

  @patch('/director-tecnicos/{id}')
  @response(204, {
    description: 'DirectorTecnico PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DirectorTecnico, {partial: true}),
        },
      },
    })
    directorTecnico: DirectorTecnico,
  ): Promise<void> {
    await this.directorTecnicoRepository.updateById(id, directorTecnico);
  }

  @put('/director-tecnicos/{id}')
  @response(204, {
    description: 'DirectorTecnico PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() directorTecnico: DirectorTecnico,
  ): Promise<void> {
    await this.directorTecnicoRepository.replaceById(id, directorTecnico);
  }

  @del('/director-tecnicos/{id}')
  @response(204, {
    description: 'DirectorTecnico DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.directorTecnicoRepository.deleteById(id);
  }
}

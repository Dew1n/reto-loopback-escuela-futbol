import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Jugador, JugadorRelations, EscuelaFutbol, DirectorTecnico} from '../models';
import {EscuelaFutbolRepository} from './escuela-futbol.repository';
import {DirectorTecnicoRepository} from './director-tecnico.repository';

export class JugadorRepository extends DefaultCrudRepository<
  Jugador,
  typeof Jugador.prototype.id,
  JugadorRelations
> {

  public readonly escuelaFutbol: BelongsToAccessor<EscuelaFutbol, typeof Jugador.prototype.id>;

  public readonly directorTecnico: BelongsToAccessor<DirectorTecnico, typeof Jugador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EscuelaFutbolRepository') protected escuelaFutbolRepositoryGetter: Getter<EscuelaFutbolRepository>, @repository.getter('DirectorTecnicoRepository') protected directorTecnicoRepositoryGetter: Getter<DirectorTecnicoRepository>,
  ) {
    super(Jugador, dataSource);
    this.directorTecnico = this.createBelongsToAccessorFor('directorTecnico', directorTecnicoRepositoryGetter,);
    this.registerInclusionResolver('directorTecnico', this.directorTecnico.inclusionResolver);
    this.escuelaFutbol = this.createBelongsToAccessorFor('escuelaFutbol', escuelaFutbolRepositoryGetter,);
    this.registerInclusionResolver('escuelaFutbol', this.escuelaFutbol.inclusionResolver);
  }
}

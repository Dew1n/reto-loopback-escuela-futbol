import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DirectorTecnico, DirectorTecnicoRelations, EscuelaFutbol, Jugador} from '../models';
import {EscuelaFutbolRepository} from './escuela-futbol.repository';
import {JugadorRepository} from './jugador.repository';

export class DirectorTecnicoRepository extends DefaultCrudRepository<
  DirectorTecnico,
  typeof DirectorTecnico.prototype.id,
  DirectorTecnicoRelations
> {

  public readonly escuelaFutbol: BelongsToAccessor<EscuelaFutbol, typeof DirectorTecnico.prototype.id>;

  public readonly jugadors: HasManyRepositoryFactory<Jugador, typeof DirectorTecnico.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EscuelaFutbolRepository') protected escuelaFutbolRepositoryGetter: Getter<EscuelaFutbolRepository>, @repository.getter('JugadorRepository') protected jugadorRepositoryGetter: Getter<JugadorRepository>,
  ) {
    super(DirectorTecnico, dataSource);
    this.jugadors = this.createHasManyRepositoryFactoryFor('jugadors', jugadorRepositoryGetter,);
    this.registerInclusionResolver('jugadors', this.jugadors.inclusionResolver);
    this.escuelaFutbol = this.createBelongsToAccessorFor('escuelaFutbol', escuelaFutbolRepositoryGetter,);
    this.registerInclusionResolver('escuelaFutbol', this.escuelaFutbol.inclusionResolver);
  }
}

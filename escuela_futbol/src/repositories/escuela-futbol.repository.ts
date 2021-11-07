import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {EscuelaFutbol, EscuelaFutbolRelations, DirectorTecnico, Jugador} from '../models';
import {DirectorTecnicoRepository} from './director-tecnico.repository';
import {JugadorRepository} from './jugador.repository';

export class EscuelaFutbolRepository extends DefaultCrudRepository<
  EscuelaFutbol,
  typeof EscuelaFutbol.prototype.id,
  EscuelaFutbolRelations
> {

  public readonly directorTecnicos: HasManyRepositoryFactory<DirectorTecnico, typeof EscuelaFutbol.prototype.id>;

  public readonly jugadors: HasManyRepositoryFactory<Jugador, typeof EscuelaFutbol.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DirectorTecnicoRepository') protected directorTecnicoRepositoryGetter: Getter<DirectorTecnicoRepository>, @repository.getter('JugadorRepository') protected jugadorRepositoryGetter: Getter<JugadorRepository>,
  ) {
    super(EscuelaFutbol, dataSource);
    this.jugadors = this.createHasManyRepositoryFactoryFor('jugadors', jugadorRepositoryGetter,);
    this.registerInclusionResolver('jugadors', this.jugadors.inclusionResolver);
    this.directorTecnicos = this.createHasManyRepositoryFactoryFor('directorTecnicos', directorTecnicoRepositoryGetter,);
    this.registerInclusionResolver('directorTecnicos', this.directorTecnicos.inclusionResolver);
  }
}

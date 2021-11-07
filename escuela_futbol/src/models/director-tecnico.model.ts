import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {EscuelaFutbol} from './escuela-futbol.model';
import {Jugador} from './jugador.model';

@model()
export class DirectorTecnico extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'number',
    required: true,
  })
  edad: number;

  @property({
    type: 'string',
    required: true,
  })
  categoria: string;

  @belongsTo(() => EscuelaFutbol)
  escuelaFutbolId: string;

  @hasMany(() => Jugador)
  jugadors: Jugador[];

  constructor(data?: Partial<DirectorTecnico>) {
    super(data);
  }
}

export interface DirectorTecnicoRelations {
  // describe navigational properties here
}

export type DirectorTecnicoWithRelations = DirectorTecnico & DirectorTecnicoRelations;

import {Entity, model, property, hasMany} from '@loopback/repository';
import {DirectorTecnico} from './director-tecnico.model';
import {Jugador} from './jugador.model';

@model()
export class EscuelaFutbol extends Entity {
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
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => DirectorTecnico)
  directorTecnicos: DirectorTecnico[];

  @hasMany(() => Jugador)
  jugadors: Jugador[];

  constructor(data?: Partial<EscuelaFutbol>) {
    super(data);
  }
}

export interface EscuelaFutbolRelations {
  // describe navigational properties here
}

export type EscuelaFutbolWithRelations = EscuelaFutbol & EscuelaFutbolRelations;

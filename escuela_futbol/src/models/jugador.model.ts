import {Entity, model, property, belongsTo} from '@loopback/repository';
import {EscuelaFutbol} from './escuela-futbol.model';
import {DirectorTecnico} from './director-tecnico.model';

@model()
export class Jugador extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  posicion: string;

  @belongsTo(() => EscuelaFutbol)
  escuelaFutbolId: string;

  @belongsTo(() => DirectorTecnico)
  directorTecnicoId: string;

  constructor(data?: Partial<Jugador>) {
    super(data);
  }
}

export interface JugadorRelations {
  // describe navigational properties here
}

export type JugadorWithRelations = Jugador & JugadorRelations;

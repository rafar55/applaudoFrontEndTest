import { Player } from './../Models/Player';
import { IRow } from './../Models/Row';
import { ConfigOptions } from './../Models/ConfigOptions';
import { Injectable } from '@angular/core';
import { Bloque } from '../Models/bloque';
import { TipoContenido } from '../Models/Tipo';

@Injectable()
export class GameService {

  ListaFilas: IRow[];
  Player1: Player;
  Player2: Player;
  Empates: number;

  private _configuracion: ConfigOptions;

  get Configuracion(): ConfigOptions {
    return this._configuracion;
  }

  constructor() { }

  IniciarJuego(opciones: ConfigOptions): void {

    this._configuracion = opciones;

    this.ListaFilas = this.GenerarRows(opciones.numN);
    this.Player1 = {
      Name: opciones.Player1,
      Wins: 0,
      Tipo: TipoContenido.X
    };
    this.Player2 = {
      Name: opciones.Player2,
      Wins: 0,
      Tipo: TipoContenido.O
    };
    this.Empates = 0;
  }

  private GenerarRows(numCell: number): IRow[] {
      const arregloRows: IRow[] = new Array(numCell);
      let contadorCell = 1;
      for (let i = 0; i < numCell; i++ ) {
          arregloRows[i] = {
            RowNumber: i,
            ListadoBloques: new Array(numCell)
          };
         for (let j = 0; j < numCell; j++) {
            arregloRows[i].ListadoBloques[j] = new Bloque(contadorCell);
            contadorCell++;
         }
      }
      return arregloRows;
  }
}

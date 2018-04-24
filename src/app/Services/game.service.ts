import { Bloque } from './../Models/bloque';
import { Player } from './../Models/Player';
import { IRow } from './../Models/Row';
import { ConfigOptions } from './../Models/ConfigOptions';
import { Injectable } from '@angular/core';
import { TipoContenido } from '../Models/Tipo';

@Injectable()
export class GameService {

  ListaFilas: IRow[];
  Player1: Player;
  Player2: Player;
  Empates: number;

  private _configuracion: ConfigOptions;
  private turno: boolean;
  private _movidas: number;

  get Configuracion(): ConfigOptions {
    return this._configuracion;
  }

  get PlayerActual(): Player {
     return (this.turno) ?  this.Player1 :  this.Player2;
  }

  get Movidas(): number {
     return this._movidas;
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
    this.turno = true;
    this._movidas = 1;
  }

  public ProcesarTurno(idCelda: number) {
    const celda = this.GetBloqueByID(idCelda);

    if (!celda.IsFree) {return; }

    celda.SetDato(this.PlayerActual.Tipo);
    this.turno = !this.turno;
    this._movidas++;
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

  private GetBloqueByID(id: number): Bloque {
    for (const fila of this.ListaFilas) {
       for (const bloqueActual of fila.ListadoBloques) {
          if (bloqueActual.Id === id) {
            return bloqueActual;
          }
       }
    }
  }
}

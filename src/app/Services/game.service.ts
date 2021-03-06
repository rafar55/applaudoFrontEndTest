import { Bloque } from './../Models/bloque';
import { Player } from './../Models/Player';
import { IRow } from './../Models/Row';
import { ConfigOptions } from './../Models/ConfigOptions';
import { Injectable } from '@angular/core';
import { TipoContenido } from '../Models/Tipo';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GameService {

  Terminado = new Subject<Player>();


  ListaFilas: IRow[];
  Player1: Player;
  Player2: Player;
  Empates: number;

  private _configuracion: ConfigOptions;
  private turno: boolean;
  private _movidas: number;
  private _juegoTerminado: boolean;

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
    this._juegoTerminado = false;
  }

  public ProcesarTurno(idCelda: number) {
    const celda = this.GetBloqueByID(idCelda);

    if (!celda.IsFree || this._juegoTerminado) {return; }

    celda.SetDato(this.PlayerActual.Tipo);

    this.CheckEstadoJuego();

    if (this._juegoTerminado === false) {
      this.turno = !this.turno;
      this._movidas++;
    }

  }

  public ResetTable(): void {
    for (const fila of this.ListaFilas) {
      for (const celda of fila.ListadoBloques) {
        celda.SetDato();
        celda.backgroundColor = '';
      }
    }
    this._juegoTerminado = false;
    this.turno = true;
    this._movidas = 1;
  }

  // Este es el metodo que me dira si el juego ya termino
  private CheckEstadoJuego(): void {

    // Primero busco si alquien ha ganado por completar horizontal
    if (this.CheckHorizontalWin()) {
        console.log('Juego se gano por completar una fila');
        this.PlayerActual.Wins += 1;
        this._juegoTerminado = true;
        this.Terminado.next(this.PlayerActual);
        return;
    }

    if (this.CheckVerticalWin()) {
      console.log('juego se gano de forma vertical');
      this.PlayerActual.Wins += 1;
      this._juegoTerminado = true;
      this.Terminado.next(this.PlayerActual);
      return;
    }

    if (this.CheckDiagonalWin()) {
      console.log('juego se gano de forma vertical');
      this.PlayerActual.Wins += 1;
      this._juegoTerminado = true;
      this.Terminado.next(this.PlayerActual);
      return;
    }

    if (this.CheckDraw()) {
      console.log('Empate');
      this.Empates += 1;
      this._juegoTerminado = true;
      this.Terminado.next(null);
      return;
    }
  }

  private CheckHorizontalWin(): boolean {

    for (const row of this.ListaFilas) {
     let flagGanado = true;
     const celdasGanadoras: Bloque[] = [];
     const valorInicial: string = row.ListadoBloques[0].Contenido;

     for (const cell of row.ListadoBloques) {
        if (cell.Contenido !== valorInicial || cell.IsFree) {
          flagGanado = false;
          break;
        }
        celdasGanadoras.push(cell);
     }

      if (flagGanado) {
        this.ShowWinningCells(celdasGanadoras);
        return true;
       }
    }
    return false;
  }

  private CheckVerticalWin(): boolean {

    for (let y = 0; y < this._configuracion.numN; y++) {
        let flagGanado = true;
        const celdasGanadoras: Bloque[] = [];
        const valorInicial = this.ListaFilas[0].ListadoBloques[y].Contenido;

        for (let x =  0; x < this._configuracion.numN; x++) {
          const filaActual = this.ListaFilas[x];
          const cellActual = filaActual.ListadoBloques[y];
          if (cellActual.Contenido !== valorInicial || cellActual.IsFree) {
            flagGanado = false;
            break;
          }
          celdasGanadoras.push(cellActual);
        }

        if (flagGanado) {
          this.ShowWinningCells(celdasGanadoras);
          return true;
         }
    }

    return false;
  }

  private CheckDiagonalWin(): boolean {
    let flagGanados = true;
    let celdasGanadoras: Bloque[] = [];
    let valorInicial = this.ListaFilas[0].ListadoBloques[0].Contenido;

    // for para revisar la primera diagonal
    for (let i = 0; i < this._configuracion.numN; i++) {
       const bloqueActual = this.ListaFilas[i].ListadoBloques[i];
       if (bloqueActual.Contenido !== valorInicial || bloqueActual.IsFree){
          flagGanados = false;
          break;
       }
       celdasGanadoras.push(bloqueActual);
    }

    if (flagGanados) {
      this.ShowWinningCells(celdasGanadoras);
      return flagGanados;
     }

    flagGanados = true;
    celdasGanadoras = [];
    valorInicial = this.ListaFilas[this._configuracion.numN - 1].ListadoBloques[0].Contenido;

    // for para probar la otra diagonal
    for (let i = (this.Configuracion.numN - 1); i >= 0; i--) {
      const bloqueActual = this.ListaFilas[i].ListadoBloques[(this._configuracion.numN - 1) - i];
      if (bloqueActual.Contenido !== valorInicial || bloqueActual.IsFree) {
         flagGanados = false;
         break;
      }
      celdasGanadoras.push(bloqueActual);
   }

    if (flagGanados) {
      this.ShowWinningCells(celdasGanadoras);
    }

    return flagGanados;

  }

  private CheckDraw(): boolean {
    for (const row of this.ListaFilas) {
      for (const cell of row.ListadoBloques) {
          if (cell.IsFree) {
            return false;
          }
       }
     }
     return true;
  }


  private ShowWinningCells(listaCells: Bloque[]) {
    listaCells.forEach(x => {
       x.backgroundColor = '#c5f2bc';
       x.IsGanador = true;
    });
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


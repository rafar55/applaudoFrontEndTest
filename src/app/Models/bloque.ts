import { TipoContenido } from './Tipo';
export class Bloque {
  Id: number;
  private _IsFree: boolean;
  private _Contenido: string;
  backgroundColor: string;
  IsGanador: boolean;

  constructor(Id: number) {
    this.Id = Id;
    this._IsFree = true;
  }

  get IsFree(): boolean {
    return this._IsFree;
  }

  get Contenido(): string {
    return this._Contenido;
  }

  SetDato(tipo: TipoContenido= null): void {
    if (tipo === null) {
      this._IsFree = true;
      this._Contenido = '';
    }

    if (tipo === TipoContenido.O) { this._Contenido = 'O'; } else { this._Contenido = 'X'; }
    this._IsFree = false;
  }

}

import { TipoContenido } from './Tipo';
export class Bloque {
  Id: number;
  private _IsFree: boolean;
  private _Contenido: string;
  backgroundColor: string;

  constructor(Id: number) {
    this.Id = Id;
  }

  get IsFree(): boolean {
    return this._IsFree;
  }

  get Contenido(): string {
    return this._Contenido;
  }

  SetDato(tipo: TipoContenido): void {
    if (tipo === TipoContenido.O) { this._Contenido = 'O'; } else { this._Contenido = 'X'; }
    this._IsFree = false;
  }

}

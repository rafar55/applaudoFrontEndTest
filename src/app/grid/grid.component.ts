import { Bloque } from './../Models/bloque';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRow } from '../Models/Row';



@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
   @Input() ListaRows: IRow[];
   @Output() OnCellSelected = new EventEmitter<number>();

  backgroundColor: string;

  constructor() {

  }

  ngOnInit() {
    console.log('iniciando grid component');
  }

  OnHover(bloque: Bloque): void {
    if (bloque.IsGanador){ return; }
    // console.log('mouse encima');
    bloque.backgroundColor = 'gray';
  }

  OnOut(bloque: Bloque): void {
   if (bloque.IsGanador){ return; }
   // console.log('mouse out');
   bloque.backgroundColor = 'white';
  }

  OnClick(IdCelda: number): void {
    console.log('Click en la celda ' +  IdCelda);
    this.OnCellSelected.emit(IdCelda);
  }
}

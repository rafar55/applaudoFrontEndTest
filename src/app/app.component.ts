import { Component } from '@angular/core';
import { Bloque } from './Models/bloque';
import { IRow } from './Models/Row';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rafael Romero';

  ListaRows: IRow[] =  [
    { RowNumber: 0, ListadoBloques: [ new Bloque(0), new Bloque(1), new Bloque(2)] },
    { RowNumber: 1, ListadoBloques: [ new Bloque(3), new Bloque(4), new Bloque(5)] },
    { RowNumber: 2, ListadoBloques: [ new Bloque(6), new Bloque(7), new Bloque(8)] },
  ];

}

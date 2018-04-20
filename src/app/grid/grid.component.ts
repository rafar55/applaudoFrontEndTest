import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() rows: number;
  @Input() cols: number;

  constructor() {
    this.rows = 3;
    this.cols = 4;
  }

  ngOnInit() {
  }

}

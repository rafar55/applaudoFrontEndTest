import { ConfigOptions } from './Models/ConfigOptions';
import { GameService } from './Services/game.service';
import { Component, OnInit } from '@angular/core';
import { Bloque } from './Models/bloque';
import { IRow } from './Models/Row';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public game: GameService) {

  }

  ngOnInit(): void {
    let defaults: ConfigOptions = {
      numN: 3,
      Player1: 'Player 1',
      Player2: 'Player 2'
    };
    this.game.IniciarJuego(defaults);
  }

  ReiniciarJuego(opciones: ConfigOptions): void {
    this.game.IniciarJuego(opciones);
  }

}

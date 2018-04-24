import { Player } from './Models/Player';
import { ConfigOptions } from './Models/ConfigOptions';
import { GameService } from './Services/game.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Bloque } from './Models/bloque';
import { IRow } from './Models/Row';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tituloModal: string;
  mensajeModal: string;
  @ViewChild('modalSucces') modal: any;

  constructor(public game: GameService, private modalService: NgbModal) {
    game.Terminado.subscribe(player => this.OnJuegoTerminado(player));
  }

  ngOnInit(): void {
    const defaults: ConfigOptions = {
      numN: 3,
      Player1: 'Player 1',
      Player2: 'Player 2'
    };
    this.game.IniciarJuego(defaults);
  }

  ReiniciarJuego(opciones: ConfigOptions): void {
    this.game.IniciarJuego(opciones);
  }

  CellClick(idCell: number): void {
    this.game.ProcesarTurno(idCell);
  }




  private OnJuegoTerminado(player: Player) {
    console.log('Juego terminado!!!');
    this.tituloModal = (player === null) ? 'Empate!' : 'Ganastes!';
    this.mensajeModal = (player === null) ? 'El juego termino en un empate!'
    : player.Name + ' has ganado la partida!';

    this.modalService.open(this.modal, {centered: true, size: 'sm'});
  }

}

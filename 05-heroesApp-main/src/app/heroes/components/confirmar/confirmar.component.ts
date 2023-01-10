import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';


@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor(
    private dialorRef: MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroe
  ) { }

  ngOnInit(): void {
  }

  borrar() {
    this.dialorRef.close(true);
  }
  cerrar() {
    this.dialorRef.close();
  }

}

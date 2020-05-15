import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../interfaces/items.interface';
import { ConexionService } from 'src/app/services/conexion.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-edit',
  templateUrl: './lista-edit.component.html',
  styleUrls: ['./lista-edit.component.css']
})
export class ListaEditComponent {
  forma: FormGroup;
  itemAux: Item;

  constructor(
    private fb: FormBuilder,
    private conexion: ConexionService,
    public dialogRef: MatDialogRef<ListaEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item) {
    this.itemAux = data;
    this.forma = this.fb.group({
      name: [this.itemAux.name, Validators.required, null]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmarEditar() {
    if (this.forma.valid) {
      this.itemAux.name = this.forma.get('name').value;
      const promise = this.conexion.editarItem(this.itemAux);
      promise.then((success) => {
        this.dialogRef.close();
      }).catch((error) => {
        throw new Error(error);
      });
    }
  }

}

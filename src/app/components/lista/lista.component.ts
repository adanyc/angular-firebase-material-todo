import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';
import { Item } from '../interfaces/items.interface';
import { MatDialog } from '@angular/material/dialog';
import { ListaEditComponent } from '../lista-edit/lista-edit.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  items: any;

  constructor(private conexion: ConexionService, public dialog: MatDialog) {
    this.conexion.listaItem().subscribe(item => {
      this.items = item;
    });
  }

  ngOnInit(): void {
  }

  eliminar(item: Item) {
    this.conexion.eliminarItem(item);
  }

  openEditDialog(item: Item) {
    const dialogRef = this.dialog.open(ListaEditComponent, {
      width: '350px',
      data: { name: item.name, id: item.id }
    });
  }
}

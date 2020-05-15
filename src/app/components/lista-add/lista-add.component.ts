import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Item } from '../interfaces/items.interface';

@Component({
  selector: 'app-lista-add',
  templateUrl: './lista-add.component.html',
  styleUrls: ['./lista-add.component.css']
})
export class ListaAddComponent implements OnInit {
  forma: FormGroup;
  item: Item = { name: null };

  constructor(private conexion: ConexionService, private fb: FormBuilder) {
    this.forma = this.fb.group({
      name: [null, Validators.required, null]
    });
  }

  ngOnInit(): void {
  }

  agregar() {
    if (this.forma.valid) {
      const ctrlName = this.forma.get('name');
      this.item.name = ctrlName.value;
      this.conexion.agregarItem(this.item);
      ctrlName.setValue(null);
    }
  }
}

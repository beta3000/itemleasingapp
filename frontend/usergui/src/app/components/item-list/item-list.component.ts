import { Component, OnInit, ViewChild } from '@angular/core';
import { AppConst } from '../../utils/app-const';
import { ItemService } from '../../services/item-service/item.service';
import { Item } from '../../models/item';
import {Http} from '@angular/http';
import {Params, ActivatedRoute, Router} from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  private itemServerPath: string = AppConst.itemServerPath;

  rows = [];

  constructor(
    private itemService: ItemService,
    private router:Router,
    private http:Http,
    private route:ActivatedRoute,
    ) {

  }

  private selected;
  private data = [];
  private settings = {
    mode: 'external',

    selectMode: 'multi',

    columns: {
      name: {
        title: 'Item Name',
        width: '130px'
      },

      status: {
        title: 'Status',
      },

      addDate: {
        title: 'Added Date',
        width: '130px'
      },

      itemCondition: {
        title: 'Condition'
      },
      
      description: {
        title: 'Description'
      }
    },

    actions: {
      add: false,
      position: 'right'
    }

  };

  onEdit(event){
    console.log(event);
    this.router.navigate(['/updateItem', event.data.id]);
  }

  onDelete(event) {
    console.log(event);
    this.selected = event.data;
    this.modal.open();
  }

  dismissed() {
  }

  closed() {
    console.log(this.selected);
    this.itemService.deleteItemById(this.selected.id).subscribe(
      res => {
        location.reload();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  opened() {
  }

  open() {
    this.modal.open();
  }

  ngOnInit() {
    this.itemService.findItemsByUser().subscribe(
      res => {
        this.data = res.json();
      },
      error => {
        console.log(error.text());
      }
      );
  }


}

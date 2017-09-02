import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AppConst } from '../../utils/app-const';
import { ItemService } from '../../services/item-service/item.service';
import { Item } from '../../models/item';
import {Http} from '@angular/http';
import {Params, ActivatedRoute, Router} from '@angular/router';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
// import {MockServerResultsService} from "./mock-server-results-service";
// import {PagedData} from "./model/paged-data";
// import {CorporateEmployee} from "./model/corporate-employee";
// import {Page} from "./model/page";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  private itemServerPath: string = AppConst.itemServerPath;

  rows = [];

  constructor(
    private itemService: ItemService,
    private router:Router,
    private http:Http,
    private route:ActivatedRoute,
    public modal: Modal
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
    this.modal.confirm()
    .size('lg')
    .isBlocking(true)
    .showClose(true)
    .keyboard(27)
    .title('Hello World')
    .body('A Customized Modal')
    .open();
  }

  ngOnInit() {
    this.itemService.findItemsByUser().subscribe(
      res => {
        console.log(res.json());
        this.data = res.json();
      },
      error => {
        console.log(error.text());
      }
    );
  }


}

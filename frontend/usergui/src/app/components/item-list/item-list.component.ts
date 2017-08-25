import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../utils/app-const';
import { ItemService } from '../../services/item-service/item.service';
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
  selected = [];

  constructor(private itemService: ItemService) {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    // const req = new XMLHttpRequest();
    // req.open('GET', this.itemServerPath+`/item/all`);

    // req.onload = () => {
    //   cb(JSON.parse(req.response));
    // };

    // req.send();

    this.itemService.findItemsByUser().subscribe(
      res => {
        console.log(res);
        cb(res.json());
      },
      error => {
        console.log(error);
      }
    );
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [ this.rows[1], this.rows[3] ];
  }

  remove() {
    this.selected = [];
  }

  ngOnInit() {}


}

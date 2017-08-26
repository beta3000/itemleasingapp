import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../utils/app-const';
import { ItemService } from '../../services/item-service/item.service';
import { Item } from '../../models/item';
import {Http} from '@angular/http';
import {Params, ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css']
})
export class AllItemsComponent implements OnInit {

  private itemServerPath: string = AppConst.itemServerPath;

  rows = [];
  selected = [];

  constructor(
  	private itemService: ItemService,
  	private router:Router,
    private http:Http,
    private route:ActivatedRoute
  	) {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    this.itemService.findAllItems().subscribe(
      res => {
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
    if (event.type=="click") {
    	this.router.navigate(['/itemDetail', event.row.id]);
	}
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

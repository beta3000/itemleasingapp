import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item-service/item.service';
import {Params, ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  private itemId: number;
  private item: Item;

  constructor(
  	private itemService: ItemService,
  	private router:Router,
		private http:Http,
		private route:ActivatedRoute
  	) { }
  

  ngOnInit() {
  	this.route.params.forEach((params: Params) => {
  		this.itemId = Number.parseInt(params['id']);

  		this.itemService.findItemById(this.itemId).subscribe(
  		res => {
  			this.item=res.json();
  			console.log(this.item);
  		},
  		error => {
  			console.log(error);
  		}
  	);
  	});
  }

}

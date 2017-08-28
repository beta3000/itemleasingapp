import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item-service/item.service';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  private itemId: number;
  private item: Item = new Item();

  constructor(
  	private itemService: ItemService,
  	private route: ActivatedRoute,
  	private router: Router
  	) { 
  }

  onUpdateItem() {
  	this.itemService.updateItem(
  		this.item).subscribe(
  		res => {
  			console.log(res);
  		}, 
  		error => {
  			console.log(error.text());
  		}
  	);
  }

  ngOnInit() {
  	this.route.params.forEach((params: Params) => {
  		this.itemId = Number.parseInt(params['id']);
  	});

  	this.itemService.findItemById(this.itemId).subscribe(
  		res => {
  			this.item = res.json();
  		}, 
  		error => console.log(error)
  	)
  }

}

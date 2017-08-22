import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item-service/item.service';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  private name: string;
  private description: string;
  private status: string;
  private itemCondition: string;

  constructor(
  	private itemService: ItemService
  	) { 
  }

  onAddItem() {
  	this.itemService.addNewItem(
  		this.name, 
      this.status, 
  		this.description, 
  		this.itemCondition).subscribe(
  		res => {
  			console.log(res);
  		}, 
  		error => {
  			console.log(error.text());
  		}
  	);
  }

  ngOnInit() {}

}

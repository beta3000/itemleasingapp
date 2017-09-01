import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../services/listing-service/listing.service';
import { ItemService } from '../../services/item-service/item.service';
import { AppConst } from '../../utils/app-const';
import { Listing } from '../../models/listing';
import {Http} from '@angular/http';
import {Params, ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {

  private listingServerPath: string = AppConst.itemServerPath;
  private listing: Listing = new Listing();

  rows = [];
  selected = [];

  constructor(
  	private listingService: ListingService,
    private itemService: ItemService,
    private router:Router,
    private http:Http,
    private route:ActivatedRoute
  	) { 
    this.fetch((data) => {
      this.rows = data;
    });
  }

  onAddListing() {
  	this.listingService.addNewListing(
  		this.listing).subscribe(
  		res => {
  			console.log(res);
  		}, 
  		error => {
  			console.log(error.text());
  		}
  	);
  }

  fetch(cb) {
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

  onUpdate(id) {
    this.router.navigate(['/updateItem', id])
  }

  onDelete(id) {
    this.itemService.deleteItemById(id).subscribe(
      res => {
        console.log(res);
      }, 
      error => {
        console.log(error.text());
      }
    );
  }

  onActivate(event) {
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

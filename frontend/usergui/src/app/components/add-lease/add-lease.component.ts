import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { Listing } from '../../models/listing';
import { ItemService } from '../../services/item-service/item.service';
import { ListingService } from '../../services/listing-service/listing.service';
import { User } from '../../models/user';
import {Params, ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';

@Component({
  selector: 'app-add-lease',
  templateUrl: './add-lease.component.html',
  styleUrls: ['./add-lease.component.css']
})
export class AddLeaseComponent implements OnInit {
  private listingId: number;
  private listing: Listing = new Listing();
  private lesser: User = new User();

  constructor(
	private listingService: ListingService,
    private itemService: ItemService,
    private router:Router,
    private http:Http,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
  	this.route.params.forEach((params: Params) => {
  		this.listingId = Number.parseInt(params['id']);

  		this.listingService.findListingById(this.listingId).subscribe(
  		res => {
  			this.listing=res.json();
  			this.lesser = this.listing.user;
  			console.log(this.lesser);
  		},
  		error => {
  			console.log(error);
  		}
  	);
  	});
  }

}

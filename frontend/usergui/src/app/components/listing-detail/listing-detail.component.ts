import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { Listing } from '../../models/listing';
import { ItemService } from '../../services/item-service/item.service';
import { ListingService } from '../../services/listing-service/listing.service';
import {Params, ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';

@Component({
	selector: 'app-listing-detail',
	templateUrl: './listing-detail.component.html',
	styleUrls: ['./listing-detail.component.css']
})
export class ListingDetailComponent implements OnInit {
	private listingId: number;
	private listing: Listing = new Listing();
	private items = [];

	constructor(
		private itemService: ItemService,
		private listingService: ListingService,
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
					console.log(this.listing);
				},
				error => {
					console.log(error);
				}
			);

			this.listingService.findItemsByListingId(this.listingId).subscribe(
				res => {
					this.items = res.json();
					console.log(this.items);
				}, 

				error => {
					console.log(error);
				}
			);
		});


	}

}

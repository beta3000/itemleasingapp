import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { Listing } from '../../models/listing';
import { Lease } from '../../models/lease';
import { ItemService } from '../../services/item-service/item.service';
import { ListingService } from '../../services/listing-service/listing.service';
import { LeaseService } from '../../services/lease-service/lease.service';
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
  private lessor: User = new User();
  private lease: Lease = new Lease();

  constructor(
	private listingService: ListingService,
    private itemService: ItemService,
    private leaseService: LeaseService,
    private router:Router,
    private http:Http,
    private route:ActivatedRoute
  ) { }

  onNewLeaseRequest(){
    this.lease.lessor = this.lessor;
    this.lease.listing = this.listing;
    this.leaseService.newLeaseRequest(this.lease).subscribe(
      res => {
        console.log(res.json());
      },

      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
  	this.route.params.forEach((params: Params) => {
  		this.listingId = Number.parseInt(params['id']);

  		this.listingService.findListingById(this.listingId).subscribe(
  		res => {
  			this.listing=res.json();
  			this.lessor = this.listing.user;
  			console.log(this.lessor);
        console.log(res);
  		},
  		error => {
  			console.log(error);
  		}
  	);
  	});
  }

}

import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { Listing } from '../../models/listing';
import { Lease } from '../../models/lease';
import { ItemService } from '../../services/item-service/item.service';
import { ListingService } from '../../services/listing-service/listing.service';
import { LeaseService } from '../../services/lease-service/lease.service';
import {Params, ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';

@Component({
  selector: 'app-lease-detail',
  templateUrl: './lease-detail.component.html',
  styleUrls: ['./lease-detail.component.css']
})
export class LeaseDetailComponent implements OnInit {

  private leaseId: number;
  private lease: Lease = new Lease();
  private actionAvailable: boolean=false;

  constructor(
	private itemService: ItemService,
    private listingService: ListingService,
    private leaseService: LeaseService,
    private router:Router,
    private http:Http,
    private route:ActivatedRoute
  ) { }

  acceptLeaseRequest(){
  	this.leaseService.acceptLeaseRequestById(this.leaseId).subscribe(
  		res => {
  			console.log(res.json());
  			this.router.navigate(['/leases']);
  		},

  		error => {
  			console.log(error);
  		}
  	);
  }

  rejectLeaseRequest(){
  	this.leaseService.rejectLeaseRequestById(this.leaseId).subscribe(
  		res => {
  			console.log(res.json());
  			this.router.navigate(['/leases']);
  		},

  		error => {
  			console.log(error);
  		}
  	);
  }

  ngOnInit() {
  	this.route.params.forEach((params: Params) => {
		this.leaseId = Number.parseInt(params['id']);

		this.leaseService.findLeaseById(this.leaseId).subscribe(
			res => {
				this.lease = res.json();
				console.log(this.lease);
				let currentUser = JSON.parse(localStorage.getItem('currentUser'));
				if(this.lease.lessor.username==currentUser.username && this.lease.status == 'requested'){
					this.actionAvailable=true;
				} else {
					this.actionAvailable=false;
				}
			},

			error => {
				console.log(error);
			}
		);
	});
  }

}

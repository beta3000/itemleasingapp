import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../services/listing-service/listing.service';
import { AppConst } from '../../utils/app-const';
import { Listing } from '../../models/listing';
import {Http} from '@angular/http';
import {Params, ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-all-listings',
  templateUrl: './all-listings.component.html',
  styleUrls: ['./all-listings.component.css']
})
export class AllListingsComponent implements OnInit {

  private data = [];
  private settings = {

    columns: {
      title: {
        title: 'Title',
        width: '300px'
      },

      status: {
        title: 'Status',
      },

      rate: {
        title: 'Rate'
      },

      deposit: {
        title: 'Deposit'
      },
      
      postDate: {
      	title: 'Post Date'
      }
    },


    actions: false

  };
  constructor(
  	private listingService: ListingService,
    private router:Router,
    private http:Http,
    private route:ActivatedRoute
  ) { }

  onUserRowSelect(event) {
    console.log(event);
    this.router.navigate(['/listingDetail', event.data.id]);
  }

  ngOnInit() {
  	this.listingService.findAllListings().subscribe(
  		res => {
  			console.log(res.json());
  			this.data = res.json();
  		},
  		error => {
  			console.log(error.text());
  		}
  	);
  }

}

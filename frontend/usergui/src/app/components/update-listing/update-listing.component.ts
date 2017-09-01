import { Component, OnInit } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Listing } from '../../models/listing';
import { ListingService } from '../../services/listing-service/listing.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { AppConst } from '../../utils/app-const';

@Component({
  selector: 'app-update-listing',
  templateUrl: './update-listing.component.html',
  styleUrls: ['./update-listing.component.css']
})
export class UpdateListingComponent implements OnInit {

  private listingServerPath: string = AppConst.listingServerPath;
  private listingId: number;
  private listing: Listing = new Listing();

  constructor(
  	private listingService: ListingService,
  	private route: ActivatedRoute,
  	private router: Router,
    private http: Http
    ) { 
  }

  onUpdateListing() {
  	this.listingService.updateListing(
  		this.listing).subscribe(
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
        this.listingId = Number.parseInt(params['id']);
      });

      this.listingService.findListingById(this.listingId).subscribe(
        res => {
          this.listing = res.json();
        }, 
        error => console.log(error)
        )
    }

}

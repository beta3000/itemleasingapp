import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../services/listing-service/listing.service';
import { AppConst } from '../../utils/app-const';
import { Listing } from '../../models/listing';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {

  private listingServerPath: string = AppConst.itemServerPath;
  private listing: Listing = new Listing();

  constructor(
  	private listingService: ListingService
  	) { 
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

  ngOnInit() {}

}

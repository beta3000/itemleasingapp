import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Listing} from '../../models/listing';
import {AppConst} from '../../utils/app-const';

@Injectable()
export class ListingService {

  private listingServerPath: string = AppConst.listingServerPath;

  constructor(private http:Http) { 
  }

  addNewListing(
  	listing: Listing
  ) {
  	let url = this.listingServerPath + '/listing/';
  	let listingInfo = {
  		"title": listing.title,
  		"status": listing.status,
  		"rate": listing.rate,
  		"deposit": listing.deposit,
  		"postDate": listing.postDate,
  		"description": listing.description,
      "itemList" : listing.itemList
  	}

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

  	let header = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+currentUser.access_token
    });

  	return this.http.post(url, JSON.stringify(listingInfo), {headers: header});
  }

  updateListing(listing: Listing) {
    let url = this.listingServerPath + '/listing/' + listing.id;
    let listingInfo = {
      	"title": listing.title,
  		"status": listing.status,
  		"rate": listing.rate,
  		"deposit": listing.deposit,
  		"postDate": listing.postDate,
  		"description": listing.description,
      "itemList" : listing.itemList
    }
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));


    let header = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+currentUser.access_token
    });

    return this.http.put(url, JSON.stringify(listingInfo), {headers: header});
  }

  deleteListingById(id: number) {
    let url = this.listingServerPath + '/listing/' + id;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));


    let header = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+currentUser.access_token
    });

    return this.http.delete(url, {headers: header});

  }

  findListingsByUser() {
    let url = this.listingServerPath + '/listing/listingsByUser';
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let header = new Headers({
      'Authorization' : 'Bearer '+currentUser.access_token
    });

    return this.http.get(url, {headers: header});
  }

  findAllListings() {
    let url = this.listingServerPath + '/listing/all';

    return this.http.get(url);
  }

  findListingById(id: number) {
    let url = this.listingServerPath + '/listing/' + id;
    
    return this.http.get(url);
  }

  findItemsByListingId(id: number) {
    let url = this.listingServerPath + '/listing/' + id + '/item';
    
    return this.http.get(url);
  }

}

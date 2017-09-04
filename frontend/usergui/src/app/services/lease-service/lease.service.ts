import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Lease } from '../../models/lease';
import { Listing } from '../../models/listing';
import { AppConst } from '../../utils/app-const';

@Injectable()
export class LeaseService {

  private leaseServerPath: string = AppConst.leaseServerPath;

  constructor(
  	private http: Http
  ) { }

  newLeaseRequest(lease: Lease) {
  	let url = this.leaseServerPath + '/lease/';
  	let leaseInfo = {
  		"startDate" : lease.startDate,
  		"endDate" : lease.endDate,
  		"status" : lease.status,
  		"lessor" : lease.listing.user,
  		"listing" : lease.listing
  	}

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));


  	let header = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+currentUser.access_token
    });

  	return this.http.post(url, JSON.stringify(leaseInfo), {headers: header});
  }

  findLeasesByLessor() {
    let url = this.leaseServerPath + '/lease/lessor';

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    let header = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+currentUser.access_token
    });

    return this.http.get(url, {headers: header});
  }

  findLeasesByLessee() {
    let url = this.leaseServerPath + '/lease/lessee';

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    let header = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+currentUser.access_token
    });

    return this.http.get(url, {headers: header});
  }

}

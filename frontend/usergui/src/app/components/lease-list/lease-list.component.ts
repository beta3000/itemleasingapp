import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { Listing } from '../../models/listing';
import { ItemService } from '../../services/item-service/item.service';
import { ListingService } from '../../services/listing-service/listing.service';
import { LeaseService } from '../../services/lease-service/lease.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-lease-list',
  templateUrl: './lease-list.component.html',
  styleUrls: ['./lease-list.component.css']
})
export class LeaseListComponent implements OnInit {

  private selected;
  private leases = [];
  private source: LocalDataSource;
  private settings = {

    columns: {
      startDate: {
        title: 'Start Date',
      },

      endDate: {
        title: 'End Date',
      },

      status: {
        title: 'Status'
      },
      
      lessor: {
        title: 'Lessor',
        valuePrepareFunction: (lessor) => {
          return lessor.username;
        }
      },

      lessee: {
      	title: 'Lessee',
        valuePrepareFunction: (lessee) => {
          return lessee.username;
        }
      }
    },

    actions: false

  };

  constructor(
  	private itemService: ItemService,
	  private listingService: ListingService,
    private leaseService: LeaseService,
	  private router:Router,
	  private http:Http,
	  private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.leaseService.findLeasesByLessor().subscribe(
      res1 => {
        this.leases = res1.json();
        this.leaseService.findLeasesByLessee().subscribe(
          res2 => {
            this.leases.push.apply(this.leases, res2.json());
            console.log(this.leases);
            this.source = new LocalDataSource(this.leases);
          },

          error2 => {
            console.log(error2);
          }
        );
      },

      error1 => {
        console.log(error1);
      }
    );
  }

}

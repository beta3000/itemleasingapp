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
  private lessorLeases = [];
  private lesseeLeases = [];
  private source: LocalDataSource;
  private lessorSettings = {

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
        },
        filterFunction(lessor?: any, search?: string): boolean {
          let match = lessor.username.indexOf(search) > -1
          if (match || search === '') {
            return true;
          } else {
            return false;
          }
        }
      },

      lessee: {
      	title: 'Lessee',
        valuePrepareFunction: (lessee) => {
          return lessee.username;
        },
        filterFunction(lessee?: any, search?: string): boolean {
          let match = lessee.username.indexOf(search) > -1
          if (match || search === '') {
            return true;
          } else {
            return false;
          }
        }
      }
    },

    actions: {
      custom: [
      {
        name: 'accept',
        title: 'Accept ',
      },
      {
        name: 'reject',
        title: 'Reject ',
      }
      ],

      add: false,

      edit: false,

      delete: false,

      position: 'right'
    },
  };

  private lesseeSettings = {

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
        },
        filterFunction(lessor?: any, search?: string): boolean {
          let match = lessor.username.indexOf(search) > -1
          if (match || search === '') {
            return true;
          } else {
            return false;
          }
        }
      },

      lessee: {
        title: 'Lessee',
        valuePrepareFunction: (lessee) => {
          return lessee.username;
        },
        filterFunction(lessee?: any, search?: string): boolean {
          let match = lessee.username.indexOf(search) > -1
          if (match || search === '') {
            return true;
          } else {
            return false;
          }
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

  onCustom(event) {
    console.log(event);
    if (event.action === 'accept') {
      this.leaseService.acceptLeaseRequestById(event.data.id).subscribe(
        res => {
          console.log(res.json());
        },
        error => {
          console.log(error);
        }
      );
    }

    if (event.action === 'reject') {
      this.leaseService.rejectLeaseRequestById(event.data.id).subscribe(
        res => {
          console.log(res.json());
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  ngOnInit() {
    this.leaseService.findLeasesByLessor().subscribe(
      res1 => {
        this.lessorLeases = res1.json();
        
      },

      error1 => {
        console.log(error1);
      }
      );

    this.leaseService.findLeasesByLessee().subscribe(
      res2 => {
        this.lesseeLeases = res2.json()
      },

      error2 => {
        console.log(error2);
      }
      );
  }

}

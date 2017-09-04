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
  private source: LocalDataSource;
  private leases = [];
  private Settings = {

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
          name: 'view',
          title: 'View ',
        }
      ],

      add: false,

      edit: false,

      delete: false,

      position: 'right'
    },
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
    this.router.navigate(['/leaseDetail', event.data.id]);
  }

  ngOnInit() {
    this.leaseService.findLeasesByLessor().subscribe(
      res1 => {
        this.leases = res1.json();
        this.leaseService.findLeasesByLessee().subscribe(
          res2 => {
            this.leases.push.apply(this.leases,res2.json())
            this.source = new LocalDataSource(this.leases);
            console.log(this.leases);
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

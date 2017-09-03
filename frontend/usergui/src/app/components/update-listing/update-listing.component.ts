import { Component, OnInit } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Item } from '../../models/item';
import { Listing } from '../../models/listing';
import { ListingService } from '../../services/listing-service/listing.service';
import { ItemService } from '../../services/item-service/item.service';
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
  private itemList: Item[];
  private data=[];

  private settings = {
    selectMode: 'multi',

    columns: {
      name: {
        title: 'Item Name',
        width: '130px'
      },

      status: {
        title: 'Status',
      },

      addDate: {
        title: 'Added Date',
        width: '130px'
      },

      itemCondition: {
        title: 'Condition'
      },
      
      description: {
        title: 'Description'
      }
    },


    actions: false

  };

  constructor(
  	private listingService: ListingService,
    private itemService: ItemService,
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

    onUserRowSelect(event) { 

    if(event.data != null) {
      if(event.isSelected) {
        for (let item of this.listing.itemList) {
          if(item.id == event.data.id && item.name == event.data.name) {
            return;
          }
        }
        this.listing.itemList.push(event.data); 
      } else {
        let id = event.data.id;
        for (let item of this.listing.itemList) {
          if (id == item.id) {
            let index = this.listing.itemList.indexOf(item);
            this.listing.itemList.splice(index, 1); 

          }
        }
      }
    } else {
      if (event.selected.length >0) {
        this.listing.itemList = event.selected;
      } else {
        this.listing.itemList=[];
      }
    }

  }

    ngOnInit() {

      this.route.params.forEach((params: Params) => {
        this.listingId = Number.parseInt(params['id']);

        this.listingService.findListingById(this.listingId).subscribe(
          res => {
            this.listing = res.json();
            this.listing.itemList = [];

          }, 
          error => console.log(error)
          );

        this.listingService.findItemsByListingId(this.listingId).subscribe(
          res => {
            console.log(res.json());
            this.itemList = res.json();
            for (let item of this.itemList) {
              this.listing.itemList.push(item);
            }
          }, 
          error => {
            console.log(error);
          });
      });

      this.itemService.findItemsByUser().subscribe(
        res => {
          this.data = res.json();

          let items = res.json();

            
            console.log(this.listing);

        },

        error => {
          console.log(error.text());
        }
      );
    }

  }

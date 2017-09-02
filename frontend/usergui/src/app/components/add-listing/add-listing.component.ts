import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../services/listing-service/listing.service';
import { ItemService } from '../../services/item-service/item.service';
import { AppConst } from '../../utils/app-const';
import { Listing } from '../../models/listing';
import {Http} from '@angular/http';
import {Params, ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {

  private listingServerPath: string = AppConst.itemServerPath;
  private selected;
  private listing: Listing = new Listing();
  private data = [];
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
    private router:Router,
    private http:Http,
    private route:ActivatedRoute
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

  onUserRowSelect(event) { 
    if(event.data != null) {
      if(event.isSelected) {
        this.listing.itemList.push(event.data); 
      } else {
        let index = this.listing.itemList.indexOf(event.data);
        if(index >-1) {
          this.listing.itemList.splice(index, 1); 
        }
      }
    } else {
      if (event.selected.length >0) {
        this.listing.itemList = event.selected;
      } else {
        this.listing.itemList=[];
      }
    }

    console.log(this.listing);
  }

  onAddItems() {
    console.log('test');
  }
   

  ngOnInit() {
    this.listing.itemList = [];
    this.itemService.findItemsByUser().subscribe(
      res => {
        console.log(res);
        this.data = res.json();
      },
      error => {
        console.log(error);
      }
    );
  }

}

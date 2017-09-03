import { Component, OnInit, ViewChild } from '@angular/core';
import { AppConst } from '../../utils/app-const';
import { ListingService } from '../../services/listing-service/listing.service';
import { Item } from '../../models/item';
import {Http} from '@angular/http';
import {Params, ActivatedRoute, Router} from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  private itemServerPath: string = AppConst.itemServerPath;
  private selected;
  private data = [];

  constructor(
    private listingService: ListingService,
    private router:Router,
    private http:Http,
    private route:ActivatedRoute
    ) {
  }

  private settings = {
    mode: 'external',

    selectMode: 'multi',

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

    actions: {
      add: false,
      position: 'right'
    }

  };

  onEdit(event){
    console.log(event);
    this.router.navigate(['/updateListing', event.data.id]);
  }

  onDelete(event) {
    console.log(event);
    this.selected = event.data;
    this.modal.open();
  }

  dismissed() {
  }

  closed() {
    console.log(this.selected);
    this.listingService.deleteListingById(this.selected.id).subscribe(
      res => {
        location.reload();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  opened() {
  }

  open() {
    this.modal.open();
  }

  ngOnInit() {
    this.listingService.findListingsByUser().subscribe(
      res => {
        this.data = res.json();
      },

      error => {
        console.log(error.text());
      }
    );
  }


}

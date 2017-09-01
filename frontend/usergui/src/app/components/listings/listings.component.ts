import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../utils/app-const';
import { ListingService } from '../../services/listing-service/listing.service';
import { Item } from '../../models/item';
import {Http} from '@angular/http';
import {Params, ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  private itemServerPath: string = AppConst.itemServerPath;

  rows = [];
  selected = [];

  constructor(
    private listingService: ListingService,
    private router:Router,
    private http:Http,
    private route:ActivatedRoute
    ) {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    this.listingService.findListingsByUser().subscribe(
      res => {
        console.log(res);
        cb(res.json());
      },
      error => {
        console.log(error);
      }
    );
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onUpdate(id) {
    this.router.navigate(['/updateListing', id])
  }

  onDelete(id) {
    this.listingService.deleteListingById(id).subscribe(
      res => {
        console.log(res);
      }, 
      error => {
        console.log(error.text());
      }
    );
  }

  onActivate(event) {
  }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [ this.rows[1], this.rows[3] ];
  }

  remove() {
    this.selected = [];
  }

  ngOnInit() {}


}

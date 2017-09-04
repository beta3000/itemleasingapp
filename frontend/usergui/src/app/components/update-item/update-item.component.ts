import { Component, OnInit } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Item } from '../../models/item';
import { Listing } from '../../models/listing';
import { ItemService } from '../../services/item-service/item.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { AppConst } from '../../utils/app-const';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {
  private itemServerPath: string = AppConst.itemServerPath;
  private itemId: number;
  private item: Item = new Item();

  private selected;
  

  constructor(
  	private itemService: ItemService,
  	private route: ActivatedRoute,
  	private router: Router,
    private http: Http
    ) { 
  }

  onUpdateItem() {
  	this.itemService.updateItem(
  		this.item).subscribe(
  		res => {
  			console.log(res);
  		}, 
  		error => {
  			console.log(error.text());
  		}
      );
    }

    onUploadImage(event) {
      let fileList: FileList = event.target.files;

      if(fileList.length > 0) {
        console.log("file added...");
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('id', this.itemId+'');

        let url = this.itemServerPath + '/item/' + this.itemId;

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        let header = new Headers({
          'Authorization' : 'Bearer '+currentUser.access_token
        });

        this.http.post(this.itemServerPath + '/item/upload', formData, {headers: header})
        .subscribe(
          res => {
            console.log(res.json);
          }, 
          error => {
            console.log(error);
          }
          )
      }
    }

    ngOnInit() {
      this.route.params.forEach((params: Params) => {
        this.itemId = Number.parseInt(params['id']);
      });

      this.itemService.findItemById(this.itemId).subscribe(
        res => {
          this.item = res.json();
        }, 
        error => console.log(error)
        );

    }

  }

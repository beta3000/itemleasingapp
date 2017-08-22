import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Item} from '../../models/item';
import {AppConst} from '../../utils/app-const';

@Injectable()
export class ItemService {

  private itemServerPath: string = AppConst.itemServerPath;

  constructor(private http:Http) { 
  }

  addNewItem(
  	name: string,
  	status: string,
  	description: string,
  	itemCondition: string
  ) {
  	let url = this.itemServerPath + '/item';
  	let itemInfo = {
  		"name" : name,
  		"status" : status,
  		"description" : description,
  		"itemCondition" : itemCondition
  	}
  	let header = new Headers({
      'Content-Type' : 'application/json'
    });

  	return this.http.post(url, JSON.stringify(itemInfo), {headers: header});
  }

}

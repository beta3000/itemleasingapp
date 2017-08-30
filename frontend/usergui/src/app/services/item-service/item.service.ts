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
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));


  	let header = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+currentUser.access_token
    });

  	return this.http.post(url, JSON.stringify(itemInfo), {headers: header});
  }

  updateItem(item: Item) {
    let url = this.itemServerPath + '/item/' + item.id;
    let itemInfo = {
      "id" : item.id,
      "name" : item.name,
      "status" : item.status,
      "description" : item.description,
      "itemCondition" : item.itemCondition
    }
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));


    let header = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+currentUser.access_token
    });

    return this.http.put(url, JSON.stringify(itemInfo), {headers: header});
  }

  deleteItemById(id: number) {
    let url = this.itemServerPath + '/item/' + id;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));


    let header = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+currentUser.access_token
    });

    return this.http.delete(url, {headers: header});

  }

  findItemsByUser() {
    let url = this.itemServerPath + '/item/itemsByUser';
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let header = new Headers({
      'Authorization' : 'Bearer '+currentUser.access_token
    });

    return this.http.get(url, {headers: header});
  }

  findAllItems() {
    let url = this.itemServerPath + '/item/all';

    return this.http.get(url);
  }

  findItemById(id: number) {
    let url = this.itemServerPath + '/item/' + id;
    
    return this.http.get(url);
  }

}

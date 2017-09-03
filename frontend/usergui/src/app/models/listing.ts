import {Item} from "./item";
import {User} from "./user";

export class Listing {
	public id: number;
	public title: string;
	public status: string;
	public rate: number;
	public deposit: number;
	public description: string;
	public postDate: string;
	public itemList: any[];
	public user: User;
}

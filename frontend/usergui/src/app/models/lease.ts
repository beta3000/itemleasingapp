import {Listing} from "./listing";
import {User} from "./user";

export class Lease {
	public id: number;
	public startDate: string;
	public endDate: string;
	public listing: Listing;
	public lessor: User;
	public status: string;
}

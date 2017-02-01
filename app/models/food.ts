import {Ingredient} from './ingredient';
export class Food {

    
    ID:string;  
    Name: string;
    How:MealMethod;
    ServingDate: Date;
    Portions:number;
    Status : string;
    Foods:FoodItem[];

    Guests:string[];
    Lounges:string[];

    //Thanks
    CanOweMeOne :boolean;
    CanOweMeCash :boolean;

    //
    Rate :number;
    
    Requests :Request[];
    Rating :number;
    Ingredients : Ingredient[];
}

export class FoodItem{
    Name:string;
    Tags:string[];
}
 export class Request
    {
         UserID:string;
         RequestedPortions:number;
         RequestedDate:Date;
         AcceptedDate:Date;
         Status: RequestStatus;
         Feedback:Feedback;
         OwesMeOne:boolean;
         OwesMeCash:boolean;
    }
    export const enum MealMethod
    {
        make,take
    }
    export const enum RequestStatus
    {
       Accepted,Requested,Rejected,Cancelled,NoShow, Reviewed,NotFound
    }

    export const enum FoodStatus
    {
        Available, Deleted, Pending
    }

    export class Feedback
    {
         Comment:string;
         Rating:number;
         ModifiedDate:Date;

    }

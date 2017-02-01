export class Ingredient
    {
          TypeID:string;

          Name:string;
        
          Quantity:number;

          Unit:UnitType;

         Tags:string[];

    }
  export  class IngredientType
    {
        
         ID:string;

          Name:string;
        
         Tags :string[];

         UnitType :UnitType;

          CreatedBy:string;

          CreatedByFood:string;

    }

    export const enum UnitType
    {
       nos,oz,cup, tsp, sp,pint,gm,ml,pt, Default
    }
export  class Search{
  private isFieldExist<T, K extends keyof T>(obj: T, Property: K): boolean {
   
    return typeof obj==="object" && obj !== null  && Property in obj && obj[Property] !== undefined && obj[Property] !== null;
  }

  Search<K extends keyof T ,T extends object>(PropertyName: K , value: T, data: T[]): T[] {
    // data represent array of object


    if (!data) {
      console.warn(
        "Search function: Input 'data' is null or undefined. Returning empty array."
      );
      return [];
    }

    if (!Array.isArray(data)) {
      console.error(
        "Search function: Input 'data' is not an array. Please provide an array of objects."
      );
      return [];
    }

    const InputVal: string = String(value);
    let searchVal  :string ; 
    if(InputVal){
       searchVal  = InputVal.toLowerCase().trim();
    }

    let res : T[] = data.filter((item: T) => {
      // item is a single object

      if (typeof item !== "object" || item === null) {
        console.warn(
          `Search function: Skipping non-object item in array:`,
          item
        );
        return false; // Exclude non-objects
      }

      if (!this.isFieldExist(item, PropertyName)) {
        //console.log("Property name is not exist !");
        return false;
      }
      // Get the value of the property for the current item
      // Use 'any' type assertion here as item[propertyName] could be nested objects
      // or numbers which need to be converted to string for includes() method.
      const itemPropertyValue: any = item[PropertyName];

      // Convert the item's property value to string and lowercase for comparison
      const itemValueString: string = String(itemPropertyValue).toLowerCase();

      // Perform a case-insensitive partial match using includes()
      return itemValueString.includes(searchVal); //* maight cause an err

    
    });
    
    return res;
  }

}

import { errorMessage } from "element/error";
import { loadingMessage } from "element/load";

export class Data<T> {
  async FetchData(subUrl: string): Promise<T[]> {
    try {
      // Show loading message
      loadingMessage!.style.display = "block";
      errorMessage!.style.display = "none"; // Hide any previous error

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${subUrl}`
      );

      // Check if the request was successful (HTTP status 200-299)
      if (!response.ok) {
        // Throw an error if the response status is not OK
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response. `await` pauses until parsing is complete.
      const data = await response.json();

      // Hide loading message
      loadingMessage!.style.display = "none";
//      console.log("data", data);
      return data;
    } catch (error: any) {
      // Explicitly type 'error' as 'any' or 'unknown' for catch block

      // Display error message to the user
      loadingMessage!.style.display = "none";
      errorMessage!.style.display = "block";
      errorMessage!.textContent = `Failed to load users: ${
        error.message || "Unknown error"
      }`;
      return [];
    }
  }

   async  FetchSingleObj<T>(subUrl: string ,id: string): Promise<T | null> {
    try {
      // Show loading message
      //loadingMessage!.style.display = "block";
     // errorMessage!.style.display = "none"; // Hide any previous error

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${subUrl}/${id}`
      );
      //console.log(response.url)

      // Check if the request was successful (HTTP status 200-299)
      if (!response.ok) {
        // Throw an error if the response status is not OK
        console.log(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
       
      }
      //console.log(response.ok)

      // Parse the JSON response. `await` pauses until parsing is complete.
      const data = await response.json();
    
      // Hide loading message
      //loadingMessage!.style.display = "none";
     console.log("data", data);
      return data;
    } catch (error: any) {
      // Explicitly type 'error' as 'any' or 'unknown' for catch block

      // Display error message to the user
     // loadingMessage!.style.display = "none";
      //errorMessage!.style.display = "block";
     /* errorMessage!.textContent = `Failed to load users: ${
        error.message || "Unknown error"
      }`;*/
      return null ;
    }
  }
}
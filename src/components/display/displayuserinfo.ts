import DisplayForm from "../../interface/display";
import User from "../../interface/user";
import { errorMessage } from "../../element/error";
import { loadingMessage } from "../../element/load";
import { Data } from "../../data/data";
import { userList } from "element/List";
import { SearchInput } from "element/search";
import { Search } from "module/search/search";

export class DisplayUserInfo implements DisplayForm<User> {
  private AllUsers: User[] = [];

  constructor() {
    this.initialize();
  }

  async load(): Promise<User[]> {
    const Users = new Data<User>();
    document.addEventListener("DOMContentLoaded", async () => {
      console.log("DOM fully loaded and parsed. Fetching users...");

      const alluser = await Users.FetchData("users");
      this.AllUsers = alluser;
      if (alluser.length > 0) {
        //console.log("this all", alluser);
        return this.display(this.AllUsers);
      }
    });
    
    return [];
  }

  
  display(users: User[]): void {
    if (userList == null) return;

    userList!.innerHTML = "";

    if (users.length === 0) {
      userList!.innerHTML = "<li>No users found.</li>";
      this.errorMessage();
      //return;
    }

   

    users.forEach((user : User) => {
      const listItem = document.createElement("li"); // Creates an <li> element
    //  console.log("users", user);
     // console.log("allu");
     listItem.className = "user-item";
      listItem.innerHTML = `
                <strong >${user.username}</strong><br>
                Email: ${user.email}<br>
                City: ${user.address?.city || "N/A"}
            `;
      userList!.appendChild(listItem); // Appends the <li> to the <ul>
    });
  }

  async DisplayUsers(): Promise<void> {
     this.load();
  }



  errorMessage(): never | null {
    if (!userList || !loadingMessage || !errorMessage) {
      console.error("Critical DOM elements not found!");
      // Exit or handle gracefully if essential elements are missing
      throw new Error("Required DOM elements missing.");
    }
    return null;
  }

  initialize() {
    this.load(); // Fetch users when the app starts
    this.handleSearch(); // Attach the search event listener
  }

  handleSearch = (): void => {
    SearchInput?.addEventListener("input", async (e: Event) => {
      userList!.innerHTML = "";
      const searchValueElement = e.target as HTMLInputElement;
      const SearchText: string = searchValueElement.value.trim();
      const listItem = document.createElement("li");
      const userInput = new Search();
      let searchProperty: keyof User;
      
      if (SearchText.length == 0) {
        await this.display(this.AllUsers);
        return;
      }

      if (
        !searchValueElement.value.match(
          "^[a-zA-Z](?!.*@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})(?!.*.(com|org|net|gov|edu|mil|biz|info|name|mobi|co|io|dev|app|xyz|tech|online|store|blog)\b).*$"
        )
      ) {
        searchProperty = "email";
      } else {
        searchProperty = "username";
      }

      console.log(`Searching by ${searchProperty} for: "${SearchInput}"`);


      const searchResult = userInput.Search(
        searchProperty,
        SearchText,
        this.AllUsers
      ) as User[];

      this.display(searchResult);
    });
  };
}

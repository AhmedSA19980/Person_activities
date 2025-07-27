
import DisplayForm from "../../interface/display";
import { errorMessage } from "../../element/error";
import { loadingMessage } from "../../element/load";
import { Data } from "../../data/data";
import { postsList}  from "element/posts";
import { SearchInput } from "element/search";
import { Search } from "module/search/search";

import IPost from "interface/post";

export class DisplayPosts implements DisplayForm<IPost> {
  private Posts: IPost[] = [];

  constructor() {
    this.initialize();
  }

  async load(): Promise<IPost[]> {
    const Users = new Data<IPost>();
    document.addEventListener("DOMContentLoaded", async () => {
      console.log("DOM fully loaded and parsed. Fetching users...");

      const posts = await Users.FetchData("posts");
      this.Posts = posts;
      if (posts.length > 0) {
      
        return this.display(this.Posts);
      }
    });

    return [];
  }

  display(posts: IPost[]): void {
    if (postsList == null) return;

    postsList!.innerHTML = "";

    if (posts.length === 0) {
      postsList!.innerHTML = "<li>No users found.</li>";
      this.errorMessage();
      //return;
    }

    posts.forEach((post: IPost) => {
      const listItem = document.createElement("li"); // Creates an <li> element
  
      listItem.className = "post-item";
      listItem.innerHTML = `
               <div><p class='Title'> Title: ${post.title}</p></div><br>
                <p class='post-body'>${post.body.substring(0 , 60)}<a  href='/post/post.html?postId=${post.id}'> readMore</a></p>
                <p><a class='author' href="/user/user.html?userId=${post.userId}">created by</a></p>
                 
            `;

      postsList!.appendChild(listItem);
    });
  }

  async DisplayUsers(): Promise<void> {
    this.load();
  }

  errorMessage(): never | null {
    if (!postsList || !loadingMessage || !errorMessage) {
      console.error("Critical DOM elements not found!");
    
      throw new Error("Required DOM elements missing.");
    }
    return null;
  }

  initialize() {
    this.load(); 
    this.handleSearch(); 
  }

  handleSearch = (): void => {
    SearchInput?.addEventListener("input", async (e: Event) => {
      postsList!.innerHTML = "";
      const searchValueElement = e.target as HTMLInputElement;
      const SearchText: string = searchValueElement.value.trim();
      const listItem = document.createElement("li");
      const userInput = new Search();
      let searchProperty: keyof IPost;

      if (SearchText.length == 0) {
        await this.display(this.Posts);
        return;
      }

     searchProperty = "title";

      console.log(`Searching by ${searchProperty} for: "${SearchInput}"`);

      const searchResult = userInput.Search(
        searchProperty,
        SearchText,
        this.Posts
      ) as IPost[];

      this.display(searchResult);
    });
  };
}

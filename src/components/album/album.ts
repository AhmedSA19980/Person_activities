import { Data } from "data/data";
import { albums as albums_container } from "element/albums";
import { loadingMessage } from "element/load";
import IAlbums from "interface/album";
import Display from "interface/display";

const albumcontainer = document.getElementById("album-container") as HTMLElement;





export class Albums implements Display<IAlbums> {
  private AllAlbums: IAlbums[] = [];

  display(albums: IAlbums[]): void {
    if (albums_container == null) return;

    albums_container.innerHTML = "";

    if (albums.length == 0) {
      albumcontainer!.innerHTML = "<li>No users found.</li>";
      this.errorMessage();
    }

    albums.forEach((album: IAlbums) => {
      const boxAlbum = document.createElement("div"); // Creates an <li> element
      
  

      boxAlbum.className = "album-box";

      boxAlbum.innerHTML = `
                    
                        <div class='album-image-wrapper'>
                        <img src='/album.c1376b2a.jpg'  alt="Default Album Cover" class="album-image" loading='lazy'> 
                        </div>
                      <div class='album-info'>
                        <h3><strong >Title: ${album.title}</strong></h3>
                       <p><a  href="/user/user.html?userId=${album.userId}">creator</a></p>
                       <div>
                      
                      
                       
                  `;

      albums_container!.appendChild(boxAlbum); // Appends the <li> to the <ul>
    });
  }

  async DisplayAlbums(): Promise<void> {
    this.load();
  }



  async load(): Promise<IAlbums[]> {
    const albums = new Data<IAlbums>();
    document.addEventListener("DOMContentLoaded", async () => {
      console.log("DOM fully loaded and parsed. Fetching users...");

      const Albums = (await albums.FetchData("albums")) as IAlbums[];

      if (Albums.length > 0) {
        this.AllAlbums = Albums;
 
        return this.display(Albums);
      }
    });

    return [];
  }

  errorMessage(): never | null {
    if (!albums_container || !loadingMessage || !this.errorMessage) {
      console.error("Critical DOM elements not found!");
      // Exit or handle gracefully if essential elements are missing
      throw new Error("Required DOM elements missing.");
    }
    return null;
  }
}

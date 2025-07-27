import IUser from "interface/user";
import IAddress from "interface/address";
import ICompany from "interface/company";
import { Data } from "data/data";




const container   = document.getElementById("container") as HTMLAnchorElement | null ;
let username : Element | null = document.querySelector(".user-name") as HTMLElement;
const companyname = document.querySelector(".company-name") as HTMLElement;
const bio = document.querySelector(".bio") as HTMLElement;
const Email = document.getElementById("email") as HTMLElement;
const address = document.getElementById("address") as HTMLElement;
const childWebLink = document.getElementById("weblink") as HTMLElement; ;
//const contact = document.getElementById("contact-item");

console.log(username)
interface userDetail extends IUser, ICompany, IAddress {}


let appContainer : HTMLElement | null =  null ;


export class User{
    
   private displayUserInfo = (user: userDetail) :void =>  {
    if (user) {
      username!.textContent = user.username;
      companyname!.textContent = user.name;
      bio.textContent = user.company.catchPhrase + ", " +  user.company.bs;
      Email.textContent = user.email;
      address.textContent = user.address.city + ", "  + user.address.street + ", " + user.address.zipcode;
      childWebLink!.textContent = user.website;
        } else {
        container!.innerHTML =
            "<p>User data could not be displayed.</p>";
        }
    }

    getQueryParam(name:string) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }


    public LoaduserInfo = async (userid: string): Promise<void> => {
       
        const fetchdata = new Data();
        const userInfo = await fetchdata.FetchSingleObj<userDetail>("users", userid);
        //console.log(userInfo);
        if(userInfo){
            
           // username!.textContent = userInfo.username;
            this.displayUserInfo(userInfo);          
        }
  

    }


   

   
/**
 * Initial page render when the script loads.
 * This ensures the correct content is displayed when the page is first accessed.
 */
 load(): void{ 
    
    document.addEventListener('DOMContentLoaded', () => {
    // Initialize appContainer when the DOM is ready
    const userid:string = this.getQueryParam("userId") || "" ;
    console.log(userid);
    this.LoaduserInfo(userid );
    })
}

};

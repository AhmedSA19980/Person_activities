import { Data } from "data/data";
import IComments from "interface/comment";
import IPost from "interface/post";



const postTitle = document.getElementById("post-title") as HTMLElement;

const postBody = document.getElementById("post-body") as HTMLElement;
const comments = document.getElementById("comments-list") as HTMLElement;
const postContainer = document.getElementById("post-container") as HTMLElement;

const BtnShowComment = document.getElementById("btn-get") as HTMLElement;

interface IPostInfo extends IPost  {}
interface ICommentInfo extends IComments {}




export class Post {
  private displayPostData = (post: IPostInfo): void => {
    if (post) {
      postTitle!.textContent = post.title;
      postBody!.textContent = post.body;
     
    } else {
      postContainer!.innerHTML = "<p>post data could not be displayed.</p>";
    }
  };

  //** show comments and hide comments */
  private ShowComment = (ListOfComments: ICommentInfo[]) :void => {
    BtnShowComment.addEventListener("click", () => {
      // Toggle the 'visible' class on the comments section
      
     const visibile =  comments.classList.toggle("visible");

      // Change button text based on visibility
      if (visibile) {
        BtnShowComment.textContent = "Hide Comments";
         this.displayCommentData(ListOfComments);
       
      }
       else {
        BtnShowComment.textContent = "Show Comments";
        comments.innerHTML = ""
      }

      
    });
  }

  private displayCommentData = (Comments: ICommentInfo[]): void  => {
    if (!comments) return;
     Comments.map((comment : ICommentInfo) => {
      const listComment = document.createElement("li");

      listComment.className = "comment-item";
      listComment.innerHTML = `
           
              <span id="comment-author"  class="comment-author">${comment.name}</span>
              <p id="comment-body" class="comment-text">${comment.body}</p>
              <p id="comment-createdBy" class="comment-date">${comment.email}</p>
        
      `
      comments.appendChild(listComment);

    });

  };

  getQueryParam(name: string) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  public LoadPostData = async (
    postId: string,
    //commentId?: string
  ): Promise<void> => {

    const fetchdata = new Data();
    const postInfo = await fetchdata.FetchSingleObj<IPostInfo>("posts", postId);
    const commentInfo = await fetchdata.FetchData(
      `posts/${postId}/comments`
    ) as ICommentInfo[];

   
    console.log(commentInfo);
    if (postInfo) {

      this.displayPostData(postInfo);
      this.ShowComment(commentInfo);
    }
  };

  load(): void {
    document.addEventListener("DOMContentLoaded", () => {
      // Initialize appContainer when the DOM is ready
    
      const postId: string = this.getQueryParam("postId") || "";
      console.log(postId);
      this.LoadPostData(postId);
    });
  }
}
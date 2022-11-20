//////////////////////// http request
// import { HttpClient } from '@angular/common/http';
// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { map, Subscription } from 'rxjs';
// import { post } from './post-model';
// import { PostService } from './post.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent implements OnInit, OnDestroy {
//   loadedPosts: post[] = [];
//   isfetching = false;
//   error: any;
//   private errorsub!: Subscription;
//   constructor(private http: HttpClient, private postsrv: PostService) {}

//   ngOnInit() {}

//   onCreatePost(postData: post) {
//     // Send Http request
//     console.log(postData);
//     this.errorsub = this.postsrv.error.subscribe((errormsg) => {
//       this.error = errormsg;
//     });
//     this.postsrv.cratePost(postData.title, postData.content);
//   }

//   onFetchPosts() {
//     // Send Http request
//     this.isfetching = true;
//     this.postsrv.fetchPost().subscribe(
//       (posts: post[]) => {
//         this.isfetching = false;
//         this.loadedPosts = posts;
//       },
//       (error) => {
//         this.error = error.message;
//         console.log(error);
//       }
//     );
//   }

//   onClearPosts() {
//     // Send Http request
//     this.postsrv.deletepost().subscribe(() => {
//       this.loadedPosts = [];
//     });
//   }
//   ngOnDestroy(): void {
//     this.errorsub.unsubscribe();
//   }
// }

/////////////////////// authentication
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}

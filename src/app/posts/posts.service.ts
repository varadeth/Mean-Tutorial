import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKENDURL = environment.apiUrl + 'posts/';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [

  ];

  private postsUpdated = new Subject<{posts: Post[],postCount: number}>();

  constructor(private http: HttpClient, private router: Router) { }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{_id: string,
      title: string,
      content: string,
      imagePath: string,
      creator: string
    }>(BACKENDURL + id);
  }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, posts: any, maxPosts: number}>(BACKENDURL + queryParams)
      .pipe(map((postsData) => {
        return { posts: postsData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath,
            creator: post.creator
          };
        }), maxPosts: postsData.maxPosts
       };
      }))
      .subscribe((transformedPostsData) => {
        console.log(transformedPostsData);
        this.posts = transformedPostsData.posts;
        console.log(this.posts);
        this.postsUpdated.next({posts : [...this.posts], postCount : transformedPostsData.maxPosts});
      });
  }

  addPost(title: string, content: string, image: File) {
    const postData =  new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http.post<{message: string, post: Post}>(BACKENDURL, postData)
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }

  deletePost(postId) {
    return this.http.delete(BACKENDURL + postId);
  }

  updatePost(postId: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if( typeof image === 'object') {
      postData = new FormData();
      console.log(postId);
      postData.append('id',postId);
      postData.append('title',title);
      postData.append('content',content);
      postData.append('image',image, title);
    } else {
      postData = { id: postId, title: title, content: content, imagePath: image, creator: null};
    }
    return this.http.put(BACKENDURL + postId, postData);
  }
}

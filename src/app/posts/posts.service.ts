import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [

  ];

  private postsUpdated = new Subject<Post[]>();

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPosts() {
    return [...this.posts];
  }

  addPost(post) {
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
  constructor() { }
}

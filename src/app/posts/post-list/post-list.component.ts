import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: 'This is First Post Content'},
  //   {title: 'Second Post', content: 'This is Second Post Content'},
  //   {title: 'Third Post', content: 'This is Third Post Content'},
  // ]
  public isLoading = false;
  posts: Post[] = [

  ];
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  private postsSub: Subscription;
  constructor(public postsService: PostsService) {
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: { posts: Post[], postCount: number})=>{
      this.posts = postData.posts;
      this.totalPosts = postData.postCount;
      this.isLoading = false;
    });
  }

  onDelete(postId) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(()=>{
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });

  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    console.log(pageData);
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
}

import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  private mode = 'create';
  private postId: string;
  public post: Post;
  public isLoading: boolean;
  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId)
          .subscribe(postData => {
            this.isLoading = false;
            this.post = {id : postData._id, title: postData.title, content : postData.content };
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }


  onSavePost(form: NgForm) {
    if( form.invalid ) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create') {
      const post: Post = {
        id: null,
        title: form.value.title,
        content: form.value.content,
      };
      this.postsService.addPost(post);

    } else {
      console.log('1');
      this.postsService.updatePost(this.postId, form.value.title , form.value.content );
    }

    form.resetForm();
  }


}

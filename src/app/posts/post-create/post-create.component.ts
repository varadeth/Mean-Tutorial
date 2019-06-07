import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';

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
  imagePreview: string;
  form: FormGroup;
  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
      content: new FormControl(null, {validators: [Validators.required]}),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId)
          .subscribe(postData => {
            this.isLoading = false;
            this.post = {id : postData._id, title: postData.title, content : postData.content, imagePath: postData.imagePath };
            this.form.setValue({title: this.post.title, content: this.post.content, image: this.post.imagePath});
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }


  onSavePost() {
    if ( this.form.invalid ) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create') {

      this.postsService.addPost(this.form.value.title,this.form.value.content, this.form.value.image);

    } else {

      this.postsService.updatePost(this.postId, this.form.value.title , this.form.value.content, this.form.value.image );
    }

    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imagePreview = (fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }
}
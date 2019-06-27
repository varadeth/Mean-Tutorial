import { Injectable } from '@angular/core';
import { Post } from '../posts/post.model';

@Injectable({
  providedIn: 'root'
})
export class MattableService {

  constructor() { }

  ELEMENT_DATA: Post[] = [
    {id: '1', title: 'First', content: 'First', imagePath: 'First', creator: 'Tejas'},
    {id: '2', title: 'First', content: 'First', imagePath: 'First', creator: 'Bhushan'},
    {id: '3', title: 'First', content: 'First', imagePath: 'First', creator: 'Priya'},
  ];

  getElementData() {
    return this.ELEMENT_DATA;
  }
}

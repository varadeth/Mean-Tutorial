import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Post } from '../posts/post.model';
import { MattableService } from './mattable.service';

@Component({
  selector: 'app-mattable-example',
  templateUrl: './mattable-example.component.html',
  styleUrls: ['./mattable-example.component.css']
})


export class MattableExampleComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'content', 'imagepath', 'creator'];
  ELEMENT_DATA: Post[];
  dataSource = new MatTableDataSource();
  constructor(public service: MattableService) {
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.ELEMENT_DATA = this.service.getElementData();
    console.log(this.ELEMENT_DATA);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

    this.dataSource.sort = this.sort;
  }

  applyFilter(value) {
    console.log(this.dataSource);
    this.dataSource.filter = value.trim().toLowerCase();
    console.log(this.dataSource);
  }

}

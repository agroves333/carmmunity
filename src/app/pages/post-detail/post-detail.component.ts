import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: any;
  iframeHtml: string;
  url: string;

  constructor(public route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      this.post = {
        title: params.get('title'),
        author: params.get('author'),
        date: params.get('date'),
        time: params.get('time'),
        type: params.get('type'),
        iframeHtml: decodeURIComponent(params.get('iframeHtml')),
        url: decodeURIComponent(params.get('url'))
      };
    });
  }

  ngOnInit() {}
}

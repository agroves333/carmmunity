import { Component, OnInit, Input } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { Post } from './post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  _post: Post;
  iframeHtml: SafeHtml = '';

  @Input()
  set post(post: Post) {
    this._post = post;
    if (post.type === 'iframe') {
      // Convert html encoded string to valid HTML to pass to sanitizer
      const parser = new DOMParser;
      const dom = parser.parseFromString(post.iframeHtml, 'text/html');
      const decodedString = dom.body.textContent;
      this.iframeHtml = this.sanitizer.bypassSecurityTrustHtml(decodedString);
    }
  }

  get post(): Post { return this._post; }

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {}
}

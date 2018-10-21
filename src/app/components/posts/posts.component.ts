import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Observable<any>;

  constructor(private postService: PostService, private router: Router) {
    this.posts = postService.getPosts();
    postService.getPosts().subscribe(posts => {
      console.log(posts);
    });
  }

  ngOnInit() {
  }

  onPostClick(post) {
    this.router.navigate(['/post'], { queryParams: {
      title: post.title,
      author: post.author,
      date: post.date,
      time: post.time,
      type: post.type,
      iframeHtml: encodeURIComponent(post.iframeHtml),
      url: encodeURIComponent(post.url),
    }});
  }
}

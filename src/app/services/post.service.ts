import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import get from 'lodash/get';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient, public sanitizer: DomSanitizer) { }

  getPosts() {
    return this.http.get('https://www.reddit.com/r/gif/.json?count=20')
      .pipe(
        map(result => get(result, 'data.children', []).map(item => {
          const data = get(item, 'data');

          const parseResponse = post => {
            const type = getType(post);
            const iframeHtml = get(post, 'media.oembed.html', '<div></div>');
            let url = '';

            if (type === 'video') {
              url = get(post, 'preview.reddit_video_preview.fallback_url',
                get(post, 'media.reddit_video.fallback_url')
              );
            } else if (type === 'gifv') {
              url = post.url.replace('.gifv', '.gif');
            } else {
              url = post.url;
            }

            const date = moment.unix(post.created);
            return {
              title: post.title,
              author: post.author,
              date: date.format('MMM DD, YYYY'),
              time: date.format('h:mm'),
              type: type,
              iframeHtml,
              url,
            };
          };

          const getType = post => {
            let type = 'image';
            if (post.is_video) {
              type = 'video';
            } else if (!post.is_video && get(post, 'media.oembed', false)) {
              type = 'iframe';
            } else if (post.url && post.url.split('.').pop() === 'gifv') {
              type = 'gifv';
            }
            return type;
          };

          return parseResponse(data);
        }))
      );
  }
}

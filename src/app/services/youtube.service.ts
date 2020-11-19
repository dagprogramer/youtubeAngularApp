import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { YoutubeResponse } from '../models/youtube.models';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
private apyKey ='AIzaSyD2_M-1f8V4CdobL-mvkTzjClPZitgVua8';
private playList ='UUuaPTYj15JSkETGnEseaFFg';
private nextPageToken = '';

  constructor(private http:HttpClient) { }

  getVideos(){
    const url=`${this.youtubeUrl}/playlistItems`;
    const params=new HttpParams()
          .set('part','snippet')
          .set('maxResults','10')
          .set('playlistId',this.playList)
          .set('key',this.apyKey)
          .set('pageToken',this.nextPageToken);
    return this.http.get<YoutubeResponse>(url,{params})
           .pipe(
             map(resp=>{
               this.nextPageToken = resp.nextPageToken;
               return resp.items;
             }),
             map(items=>items.map(video=>video.snippet))
           );      
  }
}

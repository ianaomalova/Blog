import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {FbCreateResponse, Post} from "./interfaces";
import {environment} from "../environments/environment";

@Injectable({providedIn: "root"})

export class PostsService {
  constructor(private http: HttpClient) {

  }

  create(post: Post): Observable<Post> {
    return this.http.post<any>(`${environment.fbDbUrl}posts.json`, post)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        }
      }));
  }

  remove(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}posts.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object.keys(response).map(key => ({
          ...response[key],
            id: key,
            date: new Date(response[key].date)
        }));
      }))
  }

  getById(id: string | undefined): Observable<Post> {
    return this.http.get(`${environment.fbDbUrl}/posts/${id}.json`)
      // @ts-ignore
      .pipe(map((post: Post) => {
        return {
          ...post,
          id,
          date: new Date(post.date)
        }
      }));
  }
}

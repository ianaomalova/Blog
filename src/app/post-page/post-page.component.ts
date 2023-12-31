import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../shared/interfaces";
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../shared/posts.service";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit{
  // @ts-ignore
  post$:Observable<Post>;
  constructor(private route: ActivatedRoute, private postService: PostsService) {
  }

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(switchMap((params: Params) => {
      return this.postService.getById(params['id']);
    }))
  }


}

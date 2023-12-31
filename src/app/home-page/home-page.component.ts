import {Component, OnInit} from '@angular/core';
import {PostsService} from "../shared/posts.service";
import {Observable} from "rxjs";
import {Post} from "../shared/interfaces";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  post$: Observable<Post[]> = new Observable<Post[]>();
  constructor(private postService: PostsService) {
  }

  ngOnInit(): void {
    this.post$ = this.postService.getAll();

  }

}

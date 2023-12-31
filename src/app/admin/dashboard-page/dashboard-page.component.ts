import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  pSub: Subscription = new Subscription();
  dSub: Subscription = new Subscription();
  search: string = '';
  constructor(private postsService: PostsService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    })
  }

  ngOnDestroy(): void {
    if(this.pSub) {
      this.pSub.unsubscribe();
    }
    if(this.dSub) {
      this.dSub.unsubscribe();
    }
  }

  remove(id: string | undefined) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.danger('Пост был удален')
    })
  }
}

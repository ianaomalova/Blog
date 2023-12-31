import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostsService} from "../../shared/posts.service";
import {Subscription, switchMap} from "rxjs";
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../shared/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  // @ts-ignore
  post: Post;
  submitted = false;
  uSub = new Subscription();

  constructor(private route: ActivatedRoute, private postsService: PostsService, private alert: AlertService) {

  }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params) => {
      return this.postsService.getById(params['id'])
    })).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })

    console.log(this.form);
  }

  submit() {
    if(this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.uSub = this.postsService.update({
      ...this.post,
      id: this.post.id,
      text: this.form.value.text,
      title: this.form.value.title
    }).subscribe(() => {
      this.submitted = false;
      this.alert.success('Пост был обновлен')
    })
  }

  ngOnDestroy(): void {
    if(this.uSub) {
      this.uSub.unsubscribe();
    }
  }
}


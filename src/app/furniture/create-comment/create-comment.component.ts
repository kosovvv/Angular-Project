import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommentsService } from 'src/app/shared/services/comments.service';


export interface ICustomEvent {
  test: number;
}

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent {

  @Output('myCustomEvent') customEvent = new EventEmitter();
  initialComment: string = '';

  constructor() {}

  onSubmit(formData: any) {
    this.customEvent.emit(formData.controls.comment.value);
  }


}

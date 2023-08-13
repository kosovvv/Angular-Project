import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComment } from 'src/app/models/IComment';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comment!:IComment
  @Output('deleteNotify') deleteNotify = new EventEmitter();
  editing: boolean = false;
  editedDescription: string = '';
  constructor(private commentsService: CommentsService) { }
  
  ngOnInit(): void {
  }

  onEditComment() {
    this.editing = true;
    this.editedDescription = this.comment.description;
  }

  onSaveComment() {
    this.comment.description = this.editedDescription;
    this.editing = false;
  }

  onDeleteComment() {
    this.commentsService.deleteCommentById(this.comment._id).subscribe(() => {
      this.deleteNotify.emit(true);
    });
  }

}

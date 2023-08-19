import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComment } from 'src/app/shared/models/IComment';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { CommentsService } from 'src/app/shared/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comment!:IComment
  @Output('deleteNotify') deleteNotify = new EventEmitter();
  canEditComment! : boolean;
  editing: boolean = false;
  editedDescription: string = '';
  constructor(private commentsService: CommentsService, private authService: AuthService) {
    
  }
  
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {this.canEditComment = this.comment.authorId == user?._id})
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

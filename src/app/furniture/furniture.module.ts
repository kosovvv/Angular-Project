import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DetailsComponent } from "./details/details.component";
import { EditComponent } from "./edit/edit.component";
import { MyFurnitureComponent } from "./my-furniture/my-furniture.component";
import { CreateComponent } from "./create/create.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CartItemComponent } from "./cart-item/cart-item.component";
import { CommentsComponent } from "./comments/comments.component";
import { CreateCommentComponent } from "./create-comment/create-comment.component";
import { RouterModule } from "@angular/router";
import { FurnitureRoutingModule } from "./furniture-routing.module";
import { ElapsedTimePipe } from "src/app/shared/pipes/elapsed-time";

@NgModule({
    declarations: [
      DetailsComponent,
      EditComponent,
      MyFurnitureComponent,
      CreateComponent,
      DashboardComponent,
      CartItemComponent,
      CommentsComponent,
      CreateCommentComponent,
      ElapsedTimePipe
    ],
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      FurnitureRoutingModule
    ],
    exports: [
      
    ]
  })
  export class FurnitureModule { }


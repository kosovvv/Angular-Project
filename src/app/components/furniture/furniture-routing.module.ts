import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CreateComponent } from "./create/create.component";
import { DetailsComponent } from "./details/details.component";
import { ProductDetailsResolver } from "src/app/shared/resolvers/details.resolver";
import { CommentsResolver } from "src/app/shared/resolvers/comments.resolver";
import { LikeCountResolver } from "src/app/shared/resolvers/like-count-resolver";
import { isLikedResolver } from "src/app/shared/resolvers/is-liked-resolver";
import { EditComponent } from "./edit/edit.component";
import { MyFurnitureComponent } from "./my-furniture/my-furniture.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent
    },
    {
        path: 'create',
        component: CreateComponent
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        resolve: {
            products: ProductDetailsResolver,
            comments: CommentsResolver,
            likeCount: LikeCountResolver,
            isLiked: isLikedResolver
        }
    },
    {
        path: 'edit/:id',
        component: EditComponent,
        resolve: {
            products: ProductDetailsResolver
        }
    },
    {
        path: 'my-furniture',
        component: MyFurnitureComponent
    },
];

export const FurnitureRoutingModule = RouterModule.forChild(routes);
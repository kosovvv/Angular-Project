import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "src/app/shared/guards/auth-guard";
import { LogoutComponent } from "./logout/logout.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard],
        data: {
            loginRequired: false
        }
    },
    {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [AuthGuard],
        data: {
            loginRequired: true
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard],
        data: {
            loginRequired: false
        }
    },
];

export const AuthRoutingModule = RouterModule.forChild(routes);
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PqrComponent } from './pqr/pqr.component';
import { RegisterComponent } from './auth/register/register.component';
import { PqrListComponent } from './pqr-list/pqr-list.component';
import { EditPqrComponent } from './edit-pqr/edit-pqr.component';
import { UserManagementComponent } from './user-management/user-management.component';



export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'pqr', component: PqrComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'pqrs', component: PqrListComponent },
    { path: 'edit-pqr/:id', component: EditPqrComponent },
    { path: '', redirectTo: '/pqrs', pathMatch: 'full' },
    {
        path: 'user-management',
        component: UserManagementComponent,
    },
];
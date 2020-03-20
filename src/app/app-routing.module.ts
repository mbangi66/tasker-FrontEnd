import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'lists',component:TaskViewComponent},
  {path:'new-list',component:NewListComponent},
  {path:'lists/:listId',component:TaskViewComponent},
  {path:'lists/:listId/new-task',component:NewTaskComponent},
  {path:'new-task',component:NewTaskComponent},
  {path:'login',component:LoginPageComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'editList/:listId',component:EditListComponent},
  {path:'lists/:listId/edit-tasks/:taskId',component:EditTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewContactComponent } from './components/new-contact/new-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';


const routes: Routes = [{
  path:'',
  component: HomeComponent,
}, {
  path: 'addNewContact',
  component: NewContactComponent
}
,{
  path:'editContact/:id',
  component:EditContactComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { ShortUrlComponent } from './components/short-url/short-url.component';
import { VerifiedComponent } from './components/verified/verified.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateCollectionComponent } from './components/create-collection/create-collection.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { ListCollectionComponent } from './components/list-collection/list-collection.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'short-url' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'short-url', component: ShortUrlComponent },
  { path: 'verified', component: VerifiedComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'create-collection', component: CreateCollectionComponent },
  { path: 'collections/:name', component: CollectionsComponent },
  { path: 'list-collections', component: ListCollectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
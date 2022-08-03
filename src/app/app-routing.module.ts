import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogViewerComponent } from './blog-viewer/blog-viewer.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: 'blog-list', component: BlogListComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'blog-viewer/:id', component: BlogViewerComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
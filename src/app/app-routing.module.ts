import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { BlogEntryEditorComponent } from './admin/blog-entry-editor/blog-entry-editor.component';
import { BlogViewerComponent } from './blog-viewer/blog-viewer.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'blog-viewer/:id', component: BlogViewerComponent },
  { path: 'blog-editor', component: BlogEntryEditorComponent },
  { path: 'admin', component: AdminPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
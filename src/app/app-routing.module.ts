import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { BlogEntryEditorComponent } from './admin/blog-entry-editor/blog-entry-editor.component';
import { AppComponent } from './app.component';
import { BlogViewerComponent } from './blog-viewer/blog-viewer.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: AppComponent },
  { path: 'blog-viewer/:id', component: BlogViewerComponent },
  { path: 'blog-editor', component: BlogEntryEditorComponent },
  { path: 'admin', component: AdminPanelComponent},
  { path: '**', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
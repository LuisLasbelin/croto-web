import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MapaMundiFullComponent } from './mapa-mundi-full/mapa-mundi-full.component';
import { BlogEntryEditorComponent } from './admin/blog-entry-editor/blog-entry-editor.component';
import { BlogViewerComponent } from './blog-viewer/blog-viewer.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { LogoffComponent } from './admin/logoff/logoff.component';
import { MissingPageComponent } from './missing-page/missing-page.component';

const routes: Routes = [
  { path: '', data: {title: 'Sinfonía de Sombras'}, component: LandingPageComponent },
  { path: 'mapa-mundi-full', data: {title: 'Deythea Mapa Mundi'}, component: MapaMundiFullComponent},
  { path: 'blog/:id/:title', data: {title: 'Blog'}, component: BlogViewerComponent },
  { path: 'blog-editor', data: {title: 'Editor'}, component: BlogEntryEditorComponent },
  { path: 'blog-editor/:id/:title', data: {title: 'Editor'}, component: BlogEntryEditorComponent},
  { path: 'admin', data: {title: 'Admin'}, component: AdminPanelComponent},
  { path: 'logoff', component: LogoffComponent},
  { path: '**', data: {title: '404'}, component: MissingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

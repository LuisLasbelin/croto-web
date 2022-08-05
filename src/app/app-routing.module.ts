import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogEntryEditorComponent } from './blog-entry-editor/blog-entry-editor.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogViewerComponent } from './blog-viewer/blog-viewer.component';
import { CharacterGalleryComponent } from './character-gallery/character-gallery.component';
import { LandingComponent } from './landing/landing.component';
import { MapaMundiComponent } from './mapa-mundi/mapa-mundi.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'blog-list', component: BlogListComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'blog-viewer/:id', component: BlogViewerComponent },
  { path: 'blog-editor', component: BlogEntryEditorComponent },
  { path: 'character-gallery', component: CharacterGalleryComponent },
  { path: 'mapamundi', component: MapaMundiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
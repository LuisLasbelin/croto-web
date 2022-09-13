import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './landing/landing.component';
import { BlogViewerComponent } from './blog-viewer/blog-viewer.component';
import { BlogEntryEditorComponent } from './admin/blog-entry-editor/blog-entry-editor.component';
import { ContentFragmentComponent } from './content-fragment/content-fragment.component';
import { MapaMundiComponent } from './mapa-mundi/mapa-mundi.component';
import { CharacterGalleryComponent } from './character-gallery/character-gallery.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogListComponent,
    LandingComponent,
    BlogViewerComponent,
    BlogEntryEditorComponent,
    ContentFragmentComponent,
    MapaMundiComponent,
    CharacterGalleryComponent,
    AdminPanelComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    AngularEditorModule,
    FormsModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

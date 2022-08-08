import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// TESTING //
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './service/in-memory-data.service';
//////////////////////////////
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AppComponent } from './app.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './landing/landing.component';
import { BlogViewerComponent } from './blog-viewer/blog-viewer.component';
import { BlogEntryEditorComponent } from './blog-entry-editor/blog-entry-editor.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContentFragmentComponent } from './content-fragment/content-fragment.component';
import { MapaMundiComponent } from './mapa-mundi/mapa-mundi.component';
import { CharacterGalleryComponent } from './character-gallery/character-gallery.component';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularEditorModule,
    FormsModule,
    /*//// TESTING ///////////
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    //////////////////////////////*/

    AppRoutingModule,
    HttpClientTestingModule,
    RouterModule.forRoot([])
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

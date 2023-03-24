import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { LandingComponent } from './landing/landing.component';
import { BlogViewerComponent } from './blog-viewer/blog-viewer.component';
import { BlogEntryEditorComponent } from './admin/blog-entry-editor/blog-entry-editor.component';
import { ContentFragmentComponent } from './content-fragment/content-fragment.component';
import { MapaMundiComponent } from './mapa-mundi/mapa-mundi.component';
import { CharacterGalleryComponent } from './character-gallery/character-gallery.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FooterComponent } from './footer/footer.component';
import { MapaMundiFullComponent } from './mapa-mundi-full/mapa-mundi-full.component';
import { LogoffComponent } from './admin/logoff/logoff.component';
import { MissingPageComponent } from './missing-page/missing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'public/environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

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
    LandingPageComponent,
    FooterComponent,
    MapaMundiFullComponent,
    LogoffComponent,
    MissingPageComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularEditorModule,
    FormsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [HttpClientModule, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
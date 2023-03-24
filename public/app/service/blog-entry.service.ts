import { Injectable } from '@angular/core';
import { BlogEntry, ContentFragment, defaultEntries, WorldTimeDate } from 'public/defs/blogentry';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Session } from 'public/defs/session';
import { CookiesService } from './cookies.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class BlogEntryService {

  // Local testing
  // private blogEntriesUrl = 'api/entries';  // URL to web api
  headers = {headers: {'Content-Type' : 'application/json; charset=UTF-8'}};

  constructor(
    private http: HttpClient,
    private cookiesService: CookiesService,
    private firestore: AngularFirestore) { }
    
  /**
   * 
   * @returns string[] types
   */
  getContentFragmentTypes(): { key: number, value: string }[] {
    // create array from enum ContentFragmentType
    return [
      { key: 0, value: 'Texto'},
      { key: 1, value: 'Imagen'},
      { key: 2, value: 'Video'},
      { key: 3, value: 'Link'}
    ]
  }

  getBlogEntryTags(): string[] {
    return [
      'Entrevistas',
      'Resenyas',
      'Noticias'
    ]
  }

  testFunction(): Observable<any> {
    // console.log("Testing connection api")
    return this.http.get('/api', {responseType: 'text'});
  }

  /**
   * 
   * @returns observable of entries, untyped
   */
  getBlogEntries(): Observable<any> {
    // console.log("getBlogEntries");
    return this.firestore.collection('entries').snapshotChanges();
  }

  /**
   * Gets one blog entry from the database. It is an array due to how sql manages returning items
   * @param id 
   * @returns 
   */
  getBlogEntry(id: string): Observable<any> {
     console.log("getBlogEntry " + id);
    return this.firestore.collection('entries').doc(id).snapshotChanges();
  }

  /**
   * Adds a new entry from a BlogEntry object
   * @param entry BlogEntry format with password
   * @returns Observable of entries
   */
  addBlogEntry(entry: any): Observable<BlogEntry> {
    //console.log("addBlogEntry");
    const url = `/api/add-entry`;
    // Check if there is a cookie with credentials
    let cookie: string = this.cookiesService.getCookie("ADMIN");
    // We need to upload items as strings to avoid return type problems
    let data = {
      id: entry.id,
      title: entry.title,
      tag: entry.tag.toString(),
      date: entry.date,
      content: this.contentToString(entry),
      brief: entry.brief,
      frontImageURL: entry.frontImageURL,
      frontImageAlt: entry.frontImageAlt,
      password: cookie
    }
    return this.http.post<BlogEntry>(url, data).pipe(
      //tap((newEntry: BlogEntry) => console.log(`added blog entry w/ id=${newEntry.id}`)),
      catchError(this.handleError<BlogEntry>('addBlogEntry'))
    );
  }

  editBlogEntry(id: String, entry: any) {
    //console.log("editBlogEntry");
    const url = `/api/edit-entry`;
    // Check if there is a cookie with credentials
    let cookie: string = this.cookiesService.getCookie("ADMIN");
    // We need to upload items as strings to avoid return type problems
    let data = {
      id: id,
      title: entry.title,
      tag: entry.tag.toString(),
      date: entry.date,
      content: this.contentToString(entry),
      brief: entry.brief,
      frontImageURL: entry.frontImageURL,
      frontImageAlt: entry.frontImageAlt,
      password: cookie
    }
    return this.http.post<BlogEntry>(url, data).pipe(
      //tap((newEntry: BlogEntry) => console.log(`added blog entry w/ id=${newEntry.id}`)),
      catchError(this.handleError<BlogEntry>('addBlogEntry'))
    );
  }

  /**
   * Deletes an entry based on its ID
   * @param id number 
   * @returns None
   */
  deleteBlogEntry(id: string) {
    //console.log("deleteBlogEntry");
    const url = `/api/delete-entry`;
    // Check if there is a cookie with credentials
    let cookie: string = this.cookiesService.getCookie("ADMIN");
    let data = {
      id: id,
      password: cookie
    }
    return this.http.post(url, data).pipe(
      catchError(this.handleError('addBlogEntry'))
    );
  }

  /**
   * 
   * @param password defaults to the cookie ADMIN
   * @returns Session result
   */
  login(password: string = this.cookiesService.getCookie('ADMIN')) {
    //console.log("login");
    const url = `/api/login`;
    return this.http.post<Session>(url, {password: password}).pipe(
      catchError(this.handleError('login'))
    );
  }

  /**
   * Converts content fragment array into a string to push into the database
   * @param entry BlogEntry
   * @returns string
   */
  contentToString(entry: BlogEntry): string {
    for (let i = 0; i < entry.content.length; i++) {
      // only encode if it is text
      if(entry.content[i].type.key == 0) {
        entry.content[i].content = encodeURI(entry.content[i].content);
      }
    }
    let contentString = JSON.stringify(entry.content);
    return contentString;
  }

  parseContent(s: string): ContentFragment[] {
    let content: ContentFragment[] = [];
    content = JSON.parse(s);
    for (let i = 0; i < content.length; i++) {
      if(content[i].type.key == 0) {
        content[i].content = decodeURI(content[i].content)
      }
    }
    return content;
  }

  /**
   * Transforms string of date into text of date
   * @param s string with the date in format dd/mm/yyyy
   * @return string with the date in spanish format
   */
  parseDate(s: string): string {
    // split the string for /
    let date: string[] = s.split('/');
    // check which number is the month
    let months: string[] = [
      'Empty',
      'ENERO',
      'FEBRERO',
      'MARZO',
      'ABRIL',
      'MAYO',
      'JUNIO',
      'JULIO',
      'AGOSTO',
      'SEPTIEMBRE',
      'OCTUBRE',
      'NOVIEMBRE',
      'DICIEMBRE',
    ]
    let text = date[0] + ' DE ' + months[Number(date[1])] + ' DE ' + date[2];
    return text;
  }

  /**
   * Get date from timezone 
   * @params {String} timezone with format f.e. Europe/Madrid
   * @returns get date
   */
  getDate(timezone: string): Observable<any> {
    return this.http.get<WorldTimeDate>('http://worldtimeapi.org/api/timezone/' + timezone).pipe(
      catchError(this.handleError('getDate'))
    );
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  *
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

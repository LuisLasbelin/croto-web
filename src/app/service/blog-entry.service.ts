import { Injectable } from '@angular/core';
import { BlogEntry, BlogEntryTag, ContentFragment } from 'src/defs/blogentry';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Session } from 'src/defs/session';
import { CookiesService } from './cookies.service';

@Injectable({
  providedIn: 'root'
})
export class BlogEntryService {

  // Local testing
  // private blogEntriesUrl = 'api/entries';  // URL to web api

  constructor(
    private http: HttpClient,
    private cookiesService: CookiesService) { }

  /**
   * 
   * @returns string[] types
   */
  getContentFragmentTypes(): { key: number, value: string }[] {
    // create array from enum ContentFragmentType
    return [
      { key: 0, value: 'Texto'},
      { key: 1, value: 'Imagen'},
      { key: 2, value: 'Video'}
    ]
  }

  testFunction(): Observable<any> {
    console.log("Testing connection api")
    return this.http.get('/api', {responseType: 'text'});
  }

  /**
   * Returns the tags of the blog entries. 
   *
   * @returns string[]
   */
  getBlogEntryTags(): string[] {
    // create array from enum BlogEntryTags
    let tags: string[] = [];
    for (let tag in BlogEntryTag) {
      tags.push(tag);
    }
    return tags;
  }

  /**
   * 
   * @returns observable of entries, untyped
   */
  getBlogEntries(): Observable<any> {
    console.log("getBlogEntries");
    return this.http.get(`/api/entries`)
      .pipe(
        tap(_ => console.log('fetched blog entries')),
        retry(3),
        catchError(this.handleError<any[]>('getBlogEntries', []))
      );
  }

  /**
   * Gets one blog entry from the database. It is an array due to how sql manages returning items
   * @param id 
   * @returns 
   */
  getBlogEntry(id: number): Observable<any> {
    console.log("getBlogEntry");
    const url = `/api/entries/${id}`;
    return this.http.get(url).pipe(
      tap(_ => console.log(`fetched blog entry id=${id}`)),
      retry(3),
      catchError(this.handleError<BlogEntry>(`getBlogEntry id=${id}`))
    );
  }

  /**
   * Adds a new entry from a BlogEntry object
   * @param entry BlogEntry format with password
   * @returns Observable of entries
   */
  addBlogEntry(entry: any): Observable<BlogEntry> {
    console.log("addBlogEntry");
    const url = `/api/add-entry`;
    // Check if there is a cookie with credentials
    let cookie: string = this.cookiesService.getCookie("ADMIN");
    // We need to upload items as strings to avoid return type problems
    let today = new Date();
    let data = {
      id: entry.id,
      title: entry.title,
      tag: entry.tag.toString(),
      date: `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`,
      content: this.contentToString(entry),
      brief: entry.brief,
      frontImageURL: entry.frontImageURL,
      frontImageAlt: entry.frontImageAlt,
      password: cookie
    }
    return this.http.post<BlogEntry>(url, data).pipe(
      tap((newEntry: BlogEntry) => console.log(`added blog entry w/ id=${newEntry.id}`)),
      catchError(this.handleError<BlogEntry>('addBlogEntry'))
    );
  }

  editBlogEntry(id: number, entry: any) {
    console.log("editBlogEntry");
    const url = `/api/edit-entry`;
    // Check if there is a cookie with credentials
    let cookie: string = this.cookiesService.getCookie("ADMIN");
    // We need to upload items as strings to avoid return type problems
    let today = new Date();
    let data = {
      id: entry.id,
      title: entry.title,
      tag: entry.tag.toString(),
      date: `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`,
      content: this.contentToString(entry),
      brief: entry.brief,
      frontImageURL: entry.frontImageURL,
      frontImageAlt: entry.frontImageAlt,
      password: cookie
    }
    return this.http.post<BlogEntry>(url, data).pipe(
      tap((newEntry: BlogEntry) => console.log(`added blog entry w/ id=${newEntry.id}`)),
      catchError(this.handleError<BlogEntry>('addBlogEntry'))
    );
  }

  /**
   * Deletes an entry based on its ID
   * @param id number 
   * @returns None
   */
  deleteBlogEntry(id: number) {
    console.log("deleteBlogEntry");
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
    console.log("login");
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
    let contentString = JSON.stringify(entry.content);
    return contentString;
  }

  parseContent(s: string): ContentFragment[] {
    let content: ContentFragment[] = [];
    content = JSON.parse(s);
    return content;
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

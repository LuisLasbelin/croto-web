import { Injectable } from '@angular/core';
import { BlogEntry, BlogEntryTag } from 'src/defs/blogentry';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogEntryService {

  // Local testing
  // private blogEntriesUrl = 'api/entries';  // URL to web api

  constructor(
    private http: HttpClient) { }

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

  getBlogEntries() {
    console.log("getBlogEntries");
    return this.http.get(`/api/entries`)
      .pipe(
        tap(_ => console.log('fetched blog entries')),
        retry(3),
        catchError(this.handleError<any[]>('getBlogEntries', []))
      );
  }

  
  getBlogEntry(id: number): Observable<BlogEntry> {
    console.log("getBlogEntry");
    const url = `/entries/${id}`;
    return this.http.get<BlogEntry>(url).pipe(
      tap(_ => console.log(`fetched blog entry id=${id}`)),
      retry(3),
      catchError(this.handleError<BlogEntry>(`getBlogEntry id=${id}`))
    );
  }

  addBlogEntry(entry: BlogEntry): Observable<BlogEntry> {
    console.log("addBlogEntry");
    const url = `/add-entry`;
    return this.http.post<BlogEntry>(url, entry).pipe(
      tap((newEntry: BlogEntry) => console.log(`added blog entry w/ id=${newEntry.id}`)),
      catchError(this.handleError<BlogEntry>('addBlogEntry'))
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
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

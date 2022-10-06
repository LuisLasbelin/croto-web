import { Injectable } from '@angular/core';
import { BlogEntry, ContentFragment, defaultEntries } from 'src/defs/blogentry';
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

  getBlogEntryTags(): string[] {
    return [
      'Entrevistas',
      'Resenyas',
      'Noticias'
    ]
  }

  testFunction(): Observable<any> {
    console.log("Testing connection api")
    return this.http.get('/api', {responseType: 'text'});
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
        catchError(this.handleError<any[]>('getBlogEntries', defaultEntries)) // catch error
      ) // pipe
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
      catchError(this.handleError<any[]>(`getBlogEntry id=${id}`, [{"id":2,"title":"entrevista","tag":"Entrevistas","date":"2022-08-03T00:00:00.000Z","content":"[{\"type\":{\"key\":0,\"value\":\"Texto\"},\"content\":\"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\"}]","brief":"Esto es una entrevista nueva","frontImageURL":"https://upload.wikimedia.org/wikipedia/commons/6/6a/Menara_suar_akademia.jpg","frontImageAlt":"Faro"}]))
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
      id: id,
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
    let monthNum = Number(date[1]);
    let text = date[0] + ' DE ' + monthNum + ' DE ' + date[2];
    return text;
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

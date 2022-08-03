import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { BlogEntry } from 'src/defs/blogentry';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const entries: BlogEntry[] = [
      { id: 1, title: 'Title 1', content: 'Content 1', updated: new Date(), created: new Date()},
      { id: 2, title: 'Title 2', content: 'Content 2', updated: new Date(), created: new Date() },
      { id: 3, title: 'Title 3', content: 'Content 3', updated: new Date(), created: new Date() }
    ];
    return {entries};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(p_entries: BlogEntry[]): number {
    return p_entries.length > 0 ? Math.max(...p_entries.map(entry => entry.id)) + 1 : -1;
  }
}
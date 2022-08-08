import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { BlogEntry, BlogEntryTag } from 'src/defs/blogentry';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let date : Date = new Date();
    let dateString : string = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`; 
    const contentFragmentTypes: { key: number, value: string }[] = [
      { key: 0, value: 'Texto'},
      { key: 1, value: 'Imagen'},
      { key: 2, value: 'Video'}
    ];
    const entries: BlogEntry[] = [
      { id: 1, title: 'Title 1', tag: BlogEntryTag.Noticias, content: [{type: contentFragmentTypes[0], content: "Content1"}], updated: dateString },
      { id: 2, title: 'Title 2', tag: BlogEntryTag.Otros, content: [{type: contentFragmentTypes[0], content: "Content22"}], updated: dateString },
      { id: 3, title: 'I Can Hear You - A Bubble Orchestration', tag: BlogEntryTag.Tutorial, content: [{type: contentFragmentTypes[2], content: "https://www.youtube.com/watch?v=UCVVQ8bPRgY"}, {type: contentFragmentTypes[0], content: "Esto es un vídeo"}], updated: dateString }
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
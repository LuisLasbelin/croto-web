import { ContentFragmentComponent } from "src/app/content-fragment/content-fragment.component";

export interface BlogEntry {
    id: number;
    tag: BlogEntryTag;
    title: string;
    content: ContentFragment[];
    updated: string;
}

/**
 * 
 * type: 
    * - 0: text
    * - 1: image
    * - 2: video
 */
export interface ContentFragment {
    type: { key: number, value: string };
    content: string;
}

export enum BlogEntryTag {
    Noticias = 'Noticias',
    Blog = 'Blog',
    Tutorial = 'Tutorial',
    Otros = 'Otros'
}
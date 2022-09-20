
export interface BlogEntry {
    id: number;
    tag: BlogEntryTag;
    title: string;
    content: ContentFragment[];
    date: string;
    brief: string;
    frontImageURL: string;
    frontImageAlt: string;
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
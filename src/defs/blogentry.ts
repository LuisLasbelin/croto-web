export interface BlogEntry {
    id: number;
    tag: BlogEntryTag;
    title: string;
    content: string;
    created: string;
    updated: string;
}

export enum BlogEntryTag {
    Noticias = 'Noticias',
    Blog = 'Blog',
    Tutorial = 'Tutorial',
    Otros = 'Otros'
}
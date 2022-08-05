import { ContentFragmentComponent } from "src/app/content-fragment/content-fragment.component";

export interface BlogEntry {
    id: number;
    tag: BlogEntryTag;
    title: string;
    content: ContentFragment[];
    created: string;
    updated: string;
}

export interface ContentFragment {
    type: ContentFragmentType;
    content: string;
}

export enum BlogEntryTag {
    Noticias = 'Noticias',
    Blog = 'Blog',
    Tutorial = 'Tutorial',
    Otros = 'Otros'
}

export enum ContentFragmentType {
    Text = 'text',
    Image = 'image',
    Video = 'video'
}
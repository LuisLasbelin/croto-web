
export interface BlogEntry {
    id: number;
    tag: string;
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

export var defaultEntries: BlogEntry[] = [
    {
      id: 1,
      tag: 'Resenyas',
      title: 'Una reseña de prueba',
      content: [
        {
          type: {key: 0, value: 'Text'},
          content: 'Ahora veremos si esto funciona correctamente.'
        }
      ],
      date: '2022-10-06T00000',
      brief: 'Esto no es más que una prueba',
      frontImageURL: '',
      frontImageAlt: '',
    },
    {
      id: 2,
      tag: 'Entrevistas',
      title: 'Una entrevista de prueba',
      content: [
        {
          type: {key: 0, value: 'Text'},
          content: 'Ahora veremos si esto funciona correctamente.'
        }
      ],
      date: '2022-10-07T00000',
      brief: 'Esto no es más que una prueba',
      frontImageURL: '',
      frontImageAlt: '',
    },
    {
      id: 2,
      tag: 'Noticias',
      title: 'Una noticia de prueba',
      content: [
        {
          type: {key: 0, value: 'Text'},
          content: 'Ahora veremos si esto funciona correctamente.'
        }
      ],
      date: '2022-10-08T00000',
      brief: 'Esto no es más que una prueba',
      frontImageURL: '',
      frontImageAlt: '',
    },
    {
        id: 3,
        tag: 'Noticias',
        title: 'Una noticia de prueba',
        content: [
          {
            type: {key: 0, value: 'Text'},
            content: 'Ahora veremos si esto funciona correctamente.'
          }
        ],
        date: '2022-10-08T00000',
        brief: 'Esto no es más que una prueba',
        frontImageURL: '',
        frontImageAlt: '',
      },
      {
        id: 4,
        tag: 'Noticias',
        title: 'Una noticia de prueba',
        content: [
          {
            type: {key: 0, value: 'Text'},
            content: 'Ahora veremos si esto funciona correctamente.'
          }
        ],
        date: '2022-10-08T00000',
        brief: 'Esto no es más que una prueba',
        frontImageURL: '',
        frontImageAlt: '',
      }
  ] // entries
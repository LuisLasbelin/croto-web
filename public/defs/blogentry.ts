
export interface BlogEntry {
  order: number;
  id: string;
  tag: string;
  title: string;
  content: ContentFragment[];
  date: string;
  brief: string;
  frontImageURL: string;
  frontImageAlt: string;
}

export interface WorldTimeDate {
  abbreviation: string,
  client_ip: string,
  datetime: string,
  day_of_week: number,
  day_of_year: number,
  dst: boolean,
  dst_from: string,
  dst_offset: number,
  dst_until: string,
  raw_offset: number,
  timezone: string,
  unixtime: number,
  utc_datetime: string,
  utc_offset: string,
  week_number: number
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
    order: 1,
    id: "1",
    tag: 'Resenyas',
    title: 'Una reseña de prueba',
    content: [
      {
        type: { key: 0, value: 'Text' },
        content: 'Ahora veremos si esto funciona correctamente.'
      }
    ],
    date: '6/10/2022',
    brief: 'Esto no es más que una prueba',
    frontImageURL: '',
    frontImageAlt: '',
  },
  {
    order: 2,
    id: "2",
    tag: 'Entrevistas',
    title: 'Una entrevista de prueba',
    content: [
      {
        type: { key: 0, value: 'Text' },
        content: 'Ahora veremos si esto funciona correctamente.'
      }
    ],
    date: '7/10/2022',
    brief: 'Esto no es más que una prueba',
    frontImageURL: '',
    frontImageAlt: '',
  },
  {
    order: 7,
    id: "7",
    tag: 'Noticias',
    title: 'Una noticia de prueba',
    content: [
      {
        type: { key: 0, value: 'Text' },
        content: 'Ahora veremos si esto funciona correctamente.'
      }
    ],
    date: '7/10/2022',
    brief: 'Esto no es más que una prueba',
    frontImageURL: '',
    frontImageAlt: '',
  },
  {
    order: 3,
    id: "3",
    tag: 'Noticias',
    title: 'Una noticia de prueba',
    content: [
      {
        type: { key: 0, value: 'Text' },
        content: 'Ahora veremos si esto funciona correctamente.'
      }
    ],
    date: '8/10/2022',
    brief: 'Esto no es más que una <i>prueba</i>',
    frontImageURL: '',
    frontImageAlt: '',
  },
  {
    order: 4,
    id: "4",
    tag: 'Noticias',
    title: 'Una noticia de prueba',
    content: [
      {
        type: { key: 0, value: 'Text' },
        content: 'Ahora veremos si esto funciona correctamente.'
      }
    ],
    date: '9/10/2022',
    brief: 'Esto no es más que una prueba',
    frontImageURL: '',
    frontImageAlt: '',
  }
] // entries
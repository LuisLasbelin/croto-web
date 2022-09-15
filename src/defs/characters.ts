export interface Character {
    portrait: string;
    background: string;
    name: string;
    description: string[];
    button: string;
}

export var characters: Character[] = [
    {
        portrait: "Khalia.png",
        background: "Khalia.png",
        name: "KHALIA DE MERËASS",
        description: [
            `Conocida popularmente como «la Princesa Eterna», Khalia es hija del Serafín Khoril, máximo gobernante del Reino de los Cielos, y de su esposa, la reina Amyla. Durante sus doscientos años de vida, Khalia ha permanecido en su reino de origen, a miles de leguas de la superficie terrestre, y rara vez ha abandonado su residencia, el Palacio de las Agujas, por lo que no conoce otro rincón en el mundo.`,
            `Desde pequeña, Khalia ha sido instruida bajo las férreas normas de su padre para convertirse en una mujer respetada según las costumbres de los ángeles. Su futuro prometido, Vyrean de Aesoi, es el regente de Alef, la isla principal del Reino de los Cielos, por lo que su matrimonio es fundamental para fortalecer las alianzas entre las dinastías. Antes de que dicho enlace se produzca, Khalia debe celebrar su Rito de la Madurez, una ceremonia impuesta a todas las mujeres ángeles al alcanzar los doscientos años de edad. Sin embargo, las consecuencias de este rito son drásticas e irreversibles, y Khalia podría estar comenzando a dudar de las leyes que su propio padre redactó en el libro sagrado de los ángeles, el Domo Bräe, siglos atrás.`
        ],
        button: "A"
    },
    {
        portrait: "Elio.png",
        background: "Elio.png",
        name: "ËLIO DE AMALNYS",
        description: [
            'Natural del virreno de Narhuil, Ëlio es hijo de Naelaû y Melindira y hermano mayor de Kurny. Tiene trece años y, al ser un Hijo de los Árboles, acaba de alumbrar una varita mágica, nacida de su brazo. Esta varita es de hueso y está viva, por lo que seguirá creciendo de tamaño junto a él hasta el día de su muerte.',
            'Ëlio necesita aprender la Lengua Original para controlar el poder de su varita, a la que llama Secreto de Luz. Sin embargo, siglos atrás las varitas fueron prohibidas y perseguidas, por lo que se verá obligado a mantener su identidad en secreto (a pesar de la cicatriz en su brazo que lo señala como Hijo de los Árboles). Ëlio deberá enfrentarse al difícil reto de compaginar su día a día como granjero y estudiante en Narhuil, un virreino empobrecido y sin autonomía que depende del reino de Aqualia, y acudir ocasionalmente al Círculo, una comunidad oculta de magos para recibir instrucción por parte del maestro Ettornis… intentando que ambos mundos, por su seguridad y la de su familia, jamás colisionen.'
        ],
        button: "B"
    },
    {
        portrait: "Aiyana.png",
        background: "Aiyana.png",
        name: "AIYANA DE HUAYTA",
        description: [
            'Aiyana es una campesina de dieciséis años originaria de Tiksi Muyu, el reino de tierra, donde algunos humanos nacen con la habilidad de controlar dicho elemento. Fue adoptada al nacer por Jameela, una mujer del reino de Pyros, y su esposo Rumi, fallecido años atrás a causa de una inesperada enfermedad.',
            'Aunque siempre ha sido amada y cuidada por sus padres adoptivos, Aiyana se siente un ser extraño en su aldea, Engerova, y se muestra insatisfecha con las explicaciones que sus padres le han ofrecido acerca de su misterioso pasado. Sin embargo, los problemas que sufre su pueblo, subyugado por el reino elemental de Aqualia desde hace años, la obligan a centrarse en lo que verdaderamente importa: sacar adelante a su familia.',
            'Un día, un terrible y traumático incidente le descubre una revelación acerca de su identidad. Este evento tan solo será el principio de un viaje que le hará comprender cómo funciona el mundo y quién es ella realmente.'
        ],
        button: "C"
    },
    {
        portrait: "Khoril.png",
        background: "Khoril.png",
        name: "KHORIL DE MERËASS",
        description: [
            'Khoril de Merëass es el único Serafín conocido en toda Deythea, de ahí sus alas doradas. Como Serafín, ocupa la cúspide en la jerarquía de Ascensiones que puede experimentar un ángel a lo largo de su vida inmortal, seguido de los querubines, los tronos y los arcángeles.',         
            'Khoril tiene 1.271 años y en su dilatada vida ha sido protagonista de importantes sucesos que han cambiado drásticamente el rumbo de la historia. Tras sublevarse contra el Imperio Alado y reunificar los reinos del norte, Khoril inició una ofensiva contra los demonios que habitaban en el continente Ahiza en una guerra que se sucedió durante siglos, llamada la Conquista de la Luz. ',
            'Khoril es, además, el autor del libro sagrado de los ángeles: el Domo Bräe, un texto que establece las leyes en el Reino de los Cielos, en el cual gobierna asesorado por el Cónclave Alado. Está casado con Amyla, con quien tiene cuatro hijos: Belice, Tyago, Nadio y Khalia.'
        ],
        button: "D"
    },
    {
        portrait: "Nyd.png",
        background: "Nyd.png",
        name: "NYD DE LA COLUMNA",
        description: [
            'Nyd de la Columna es una demonio balberith, como demuestran sus alas plateadas, por lo que su rango es equivalente a los querubines en la jerarquía angelical.',
            'Nyd es de los pocos demonios que consiguieron librarse del Infierno. Vive en secreto junto a su comunidad, la Columna, aunque su reciente Ascensión la ha empujado fuera de su hogar para buscar la manera de devolverle a los demonios un lugar en la superficie terrestre.',
            'Nyd desea, por todos los medios, vengarse de su pueblo, y no parará hasta acabar con el Serafín Khoril, a quien considera su mayor enemigo.'        ],
        button: "E"
    },
    {
        portrait: "Nyd.png",
        background: "Nyd.png",
        name: "ALENA",
        description: [
            'Nyd de la Columna es una demonio balberith, como demuestran sus alas plateadas, por lo que su rango es equivalente a los querubines en la jerarquía angelical.',
            'Nyd es de los pocos demonios que consiguieron librarse del Infierno. Vive en secreto junto a su comunidad, la Columna, aunque su reciente Ascensión la ha empujado fuera de su hogar para buscar la manera de devolverle a los demonios un lugar en la superficie terrestre.',
            'Nyd desea, por todos los medios, vengarse de su pueblo, y no parará hasta acabar con el Serafín Khoril, a quien considera su mayor enemigo.'        ],
        button: "F"
    },
    {
        portrait: "Nyd.png",
        background: "Nyd.png",
        name: "HOJAD",
        description: [
            'Nyd de la Columna es una demonio balberith, como demuestran sus alas plateadas, por lo que su rango es equivalente a los querubines en la jerarquía angelical.',
            'Nyd es de los pocos demonios que consiguieron librarse del Infierno. Vive en secreto junto a su comunidad, la Columna, aunque su reciente Ascensión la ha empujado fuera de su hogar para buscar la manera de devolverle a los demonios un lugar en la superficie terrestre.',
            'Nyd desea, por todos los medios, vengarse de su pueblo, y no parará hasta acabar con el Serafín Khoril, a quien considera su mayor enemigo.'        ],
        button: "F"
    }
]

export const fetchRandomBibleVerse = async () => {
    try {
        // Lista de libros y capítulos
        const books = {
            "génesis": 50,
            "éxodo": 40,
            "levítico": 27,
            "números": 36,
            "deuteronomio": 34,
            "josué": 24,
            "jueces": 21,
            "rut": 4,
            "1samuel": 31,
            "2samuel": 24,
            "1reyes": 22,
            "2reyes": 25,
            "1crónicas": 29,
            "2crónicas": 36,
            "esdras": 10,
            "nehemías": 13,
            "ester": 10,
            "job": 42,
            "salmos": 150,
            "proverbios": 31,
            "eclesiastés": 12,
            "cantares": 8,
            "isaías": 66,
            "jeremías": 52,
            "lamentaciones": 5,
            "ezequiel": 48,
            "daniel": 12,
            "oseas": 14,
            "joel": 3,
            "amós": 9,
            "abdías": 1,
            "jonás": 4,
            "miqueas": 7,
            "nahúm": 3,
            "habacuc": 3,
            "sofonías": 3,
            "hageo": 2,
            "zacarías": 14,
            "malaquías": 4,
            "sanmateo": 28,
            "sanmarcos": 16,
            "sanlucas": 24,
            "sanjuan": 21,
            "hechos": 28,
            "romanos": 16,
            "1corintios": 16,
            "2corintios": 13,
            "gálatas": 6,
            "efesios": 6,
            "filipenses": 4,
            "colosenses": 4,
            "1tesalonicenses": 5,
            "2tesalonicenses": 3,
            "1timoteo": 6,
            "2timoteo": 4,
            "tito": 3,
            "filemón": 1,
            "hebreos": 13,
            "santiago": 5,
            "1pedro": 5,
            "2pedro": 3,
            "1juan": 5,
            "2juan": 1,
            "3juan": 1,
            "judas": 1,
            "apocalipsis": 22
        };
        
          
        // Selecciona un libro aleatorio
        const bookNames = Object.keys(books);
        const randomBook = bookNames[Math.floor(Math.random() * bookNames.length)];

        // Selecciona un capítulo aleatorio dentro del libro
        const maxChapters = books[randomBook];
        const randomChapter = Math.floor(Math.random() * maxChapters) + 1;

        // Selecciona un versículo aleatorio
        // Nota: El número de versículos por capítulo puede variar, aquí usamos un valor máximo de 30
        // Puedes ajustar esto basado en información más precisa si está disponible
        const maxVerses = 30; // Ajusta si tienes información más específica
        const randomVerse = Math.floor(Math.random() * maxVerses) + 1;

        // Construye la URL
        const url = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/es-rv09/books/${randomBook}/chapters/${randomChapter}/verses/${randomVerse}.json`;

        // Solicita el versículo
        const response = await fetch(url);
        const data = await response.json();
        // Retorna el versículo
        return {verso: `${randomBook.toUpperCase()} ${randomChapter}:${data.verse}`, cita: data.text};

    } catch (error) {
        console.error("Error fetching Bible verse:", error);
        return "Versículo no disponible.";
    }
};




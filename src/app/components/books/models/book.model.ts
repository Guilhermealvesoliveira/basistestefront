export interface Book {
    bookId: number;
    title: string;
    publisher: string;
    edition: string;
    publicationYear: string;
    subjectsId: number[];
    authorsId: number[];
  }
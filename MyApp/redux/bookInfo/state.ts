export interface BookInfoState {
    id: number;
    title: string;
    author_name: string;
    publisher_name: string;
    publish_date: string;
    book_picture: string;
    genre: string[];
    info: string;
    rating: number | undefined;
    readerStatus: 'read' | 'reading' | 'want to read' | undefined;
    isbn: string;
    page: number;
}
export class Book {
  bookId?: number;
  bookName: string = '';
  bookAuthorName: string = '';
  bookDescription: string = '';
  bookCategory: string = '';
  bookPrice: number;
  bookImage: string = '';
  bookSeries:string='';
  relatedBooks?: Book[] = [];
  isWishlisted: boolean ;

  constructor(
    bookName: string,
    bookAuthorName: string,
    bookDescription: string,
    bookCategory: string,
    bookPrice: number,
    bookImage: string,
    bookSeries:string,
    relatedBooks: Book[] = [],
    isWishlisted:boolean
  ) {
    (this.bookName = bookName),
      (this.bookAuthorName = bookAuthorName),
      (this.bookDescription = bookDescription),
      (this.bookCategory = bookCategory),
      (this.bookPrice = bookPrice),
      (this.bookImage = bookImage),
      (this.bookSeries= bookSeries),
      (this.relatedBooks=relatedBooks);
      (this.isWishlisted=isWishlisted);
  }

}

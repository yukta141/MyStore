export class Admin {
  bookId?: number;
  bookName: string = '';
  bookAuthorName: string = '';
  bookDescription: string = '';
  bookCategory: string = '';
  bookPrice: number;
  bookImage: string = '';
  bookSeries:string='';

  constructor(
    bookName: string,
    bookAuthorName: string,
    bookDescription: string,
    bookCategory: string,
    bookPrice: number,
    bookImage: string,
    bookSeries:string,
  ) {
    (this.bookName = bookName),
      (this.bookAuthorName = bookAuthorName),
      (this.bookDescription = bookDescription),
      (this.bookCategory = bookCategory),
      (this.bookPrice = bookPrice),
      (this.bookImage = bookImage),
      (this.bookSeries = bookSeries);
  }
}

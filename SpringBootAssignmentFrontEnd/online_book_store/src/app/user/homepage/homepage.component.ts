import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import { Book } from '../../model/book';
import { CategoryService } from '../../service/category.service';
import { BooksearchService } from '../../service/booksearch.service';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  categories:Category[]=[]
  books:Book[]=[]

  searchQuery: string = '';
    constructor(private service:CategoryService,private bookService: BookService)
    {
       
    }
    ngOnInit()
    {
      this.service.getCategoryDetails().subscribe(response=>{
        console.log(response);
        this.categories=response;  
        // this.bookService.getSeries();
        this.bookService.getSeries().subscribe((data: Book[]) => {
          this.books = data;
        });
       
      })    
    }

}

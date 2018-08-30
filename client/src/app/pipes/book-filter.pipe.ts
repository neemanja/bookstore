import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {

  transform(books: any, title?: any, category?: any): any {
    
    if(books){
      if((title === undefined) && (category === undefined)) return books
   
      else{
        return books.filter(book=>{
          return ((book.title.toLowerCase().includes(title.toLowerCase())) && (book.category.toLowerCase().includes(category.toLowerCase())));
        })
      }

    }
    
    
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(categories: any, category?: any): any {
    if(category === undefined) return categories
    return categories.filter(cat=>{
      return (cat.name.toLowerCase().includes(category.toLowerCase()))
    })
  }
}

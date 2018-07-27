import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {
  categoryList: any = [];
  editState:boolean = false;
  categoryToEdit:any= [];
  categoryToDelete:any= [];

  constructor(
   private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().then(data=> {
      this.categoryList = data.categories;
    })
  }

  createCategory(category){
    this.categoryService.addCategory(category).then(data=>{
      this.categoryList.push(data.category);
    })
  }

  saveEditCategory(category){
    this.categoryService.updateCategory(category).then(data=>{
      const updatedCategory = this.categoryList.map(cat => {
        if(data.category._id !== cat._id){
          return cat
        }
        return data.category;
      })
      this.categoryList = updatedCategory;
      this.editState = false;
    })
  }

  showEdit(category){  
    this.categoryToEdit = category;
    this.editState = true;
  }

  showDeleteCategory(category){
    console.log(category)
    this.categoryToDelete = category;
  }

  closeEdit(){
    this.editState = false;
  }

  deleteCategory(category){
    this.categoryService.deleteCategory(category).then(data=>{
      const filteredCategories = this.categoryList.filter(c => c._id !== data.category._id)
      this.categoryList = filteredCategories
      document.getElementById('closeDeleteModal').click();
    })
  }

}

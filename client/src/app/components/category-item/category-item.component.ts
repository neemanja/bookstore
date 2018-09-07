import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


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
  showCategory:boolean= true;

  constructor(
   private categoryService: CategoryService,
   private auth: AuthenticationService,
   private toast: ToastsManager
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().then(data=> {
      this.categoryList = data.categories;
    })
  }

  createCategory(category){
    this.categoryService.addCategory(category).then(data=>{
      if(data.success){
        this.categoryList.push(data.category);
        this.toast.success(data.message, 'Success');
      }      
    })
    .catch(err=>{
      this.toast.error(err.message, 'Error');
    })
  }

  saveEditCategory(category){
    this.categoryService.updateCategory(category).then(data=>{
      if(data.success){
        const updatedCategory = this.categoryList.map(cat => {
          if(data.category._id !== cat._id){
            return cat
          }
          return data.category;
        })
        this.categoryList = updatedCategory;
        this.editState = false;
        this.toast.success(data.message, 'Success');
      }
      
    }).catch(err=>{
      this.toast.error(err.message, 'Error');
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

  deleteCategory(){
    this.categoryService.deleteCategory(this.categoryToDelete._id).then(data=>{
      if(data.success){
        const filteredCategories = this.categoryList.filter(c => c._id !== data.category._id)
        this.categoryList = filteredCategories
        document.getElementById('closeDeleteModal').click();
        this.toast.success(data.message, 'Success');
      }
    })
    .catch(err=>{
      this.toast.error(err.message, 'Error');
    })
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class CategoryService {
  categoryApi:string = 'http://localhost:3001/api/categories';
  constructor(
    private http: HttpClient
  ) { }

  getCategories():Promise<any>{
    return this.http.get(this.categoryApi)
               .toPromise()
               .then(this.getData)
               .catch(this.getError)
  }

  addCategory(category):Promise<any>{
    const formData = new FormData()
    formData.append('name', category.name);
    formData.append('description', category.description);

    return this.http.post(this.categoryApi, formData)
               .toPromise()
               .then(this.getData)
               .catch(this.getError)
  }

  updateCategory(category):Promise<any>{
    const formData = new FormData()
    formData.append('_id', category._id);
    formData.append('name', category.name);
    formData.append('description', category.description);

    return this.http.put(this.categoryApi, formData)
               .toPromise()
               .then(this.getData)
               .catch(this.getError)
  }

  deleteCategory(id):Promise<any>{
    return this.http.delete(this.categoryApi+'/'+id)
                    .toPromise()
                    .then(this.getData)
                    .catch(this.getError)
  }

  private getData(res:any){
    let body = res;
    return body || {};
  }

  private getError(error: any):Promise<any>{
    return Promise.reject(error.message || error)
  }

}

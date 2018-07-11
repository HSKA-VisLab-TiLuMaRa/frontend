import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { HttpService } from './http.service';

@Injectable()
export class CatalogService {

  constructor(private httpService: HttpService) { }

  private url:string = "http://localhost:8081/catalog-management-api";

  getOneProduct(id:number){
    return this.httpService.get(this.url + "/products/" + id);
  }

  getAllProducts(){
    return this.httpService.get(this.url + "/products");
  }

  updateOneProduct(id:number, product:any){
    return this.httpService.put(this.url + "/products/" + id, product);
  }

  createOneProduct(product:any){
    return this.httpService.post(this.url + "/products", product);
  }

  deleteOneProduct(id:any){
    return this.httpService.delete(this.url + "/products/" + id);
  }

  getOneCategory(id:number){
    return this.httpService.get(this.url + "/categories/" + id);
  }

  getAllCategories(){
    return this.httpService.get(this.url + "/categories");
  }

  updateOneCategory(id:number, category:any){
    return this.httpService.put(this.url + "/categories/" + id, category);
  }

  createOneCategory(category:any){
    return this.httpService.post(this.url + "/categories", category);
  }

  deleteOneCategory(id:any){
    return this.httpService.delete(this.url + "/categories/" + id);
  }

}

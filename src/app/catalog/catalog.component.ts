import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CatalogService } from "./../catalog.service";
import { HttpService } from './../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(
    private catalogService: CatalogService,
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  private searchForm: any;
  private loginForm: any;
  private products: any = [];
  private categories: any = [];

  private loggedIn: boolean = false;

  login(form: any) {
    let self:any = this;
    this.httpService.login(form.username, form.password).subscribe((res:any) => {
      this.loggedIn = true;
      console.log('RES', res._body);
      self.httpService.setToken(JSON.parse(res._body).access_token);
      self.catalogService.getAllProducts().subscribe((res: any) => {
        console.log('RES', res)
        self.products = res;
      });
      self.catalogService.getAllCategories().subscribe((res: any) => {
        console.log('RES', res)
        self.categories = res;
      });
    });
  }

  search(form: any) {
    this.catalogService.getAllProducts().subscribe((res: any) => {
      console.log('RES', res);
      const toReturn = [];
      res.forEach(element => {
        if (form.categoryId != null && !this.getCategory(element.categoryId).contains(form.categoryId)) {
          console.log('a');
          return;
        }
        if (form.productName !== '' && !element.name.contains(form.productName)) {
          console.log('b');
          return;
        }
        toReturn.push(element);
      });
      this.products = toReturn;
    });

  }

  getCategory(id) {
   const category = this.categories.find(x => x.id === id);
     if (category) {
       return category.name;
     } else {
       return '';
     }
  }

  ngOnInit() {
    let self: any = this;
    this.searchForm = new FormGroup({
      categoryId: new FormControl(),
      productName: new FormControl()
    });
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
    if (this.loggedIn) {
      let self: any = this;
      self.catalogService.getAllProducts().subscribe((res: any) => {
        console.log('RES', res)
        self.products = res;
      });
    }
  }

}

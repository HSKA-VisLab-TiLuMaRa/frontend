import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CatalogService } from "./../catalog.service";
import { UserService } from "./../user.service";
import { HttpService } from './../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(
    private catalogService: CatalogService,
    private userService: UserService,
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  private searchForm: any;
  private loginForm: any;
  private registerForm: any;
  private products: any = [];
  private categories: any = [];

  dataSource;
  displayedColumns = ['id', 'name', 'price', 'details'];
  private userid: number = 5;

  private loggedIn: boolean = false;

  login(form: any) {
    let self: any = this;
    this.httpService.login(form.username, form.password).subscribe((res: any) => {
      this.loggedIn = true;
      self.httpService.setToken(JSON.parse(res._body).access_token);
      self.catalogService.getAllProducts().subscribe((res: any) => {
        console.log('RES', res)
        self.products = res;
        this.dataSource = new MatTableDataSource(res);
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

  register(form: any) {
    console.log(form);
    let user = {
      username: form.newUsername,
      firstname: form.firstname,
      lastname: form.lastname,
      password: form.newPassword,
      roleId: 0
    };
    let self: any = this;
    self.userService.createUser(user).subscribe((res: any) => {
      console.log(res);
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

  logout() {
    this.httpService.setToken('null');
    this.loggedIn = this.httpService.isLoggedIn();
  }

  ngOnInit() {
    let self: any = this;
    this.loggedIn = this.httpService.isLoggedIn()
    this.searchForm = new FormGroup({
      categoryId: new FormControl(),
      productName: new FormControl()
    });
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
    this.registerForm = new FormGroup({
      newUsername: new FormControl(),
      newPassword: new FormControl(),
      firstname: new FormControl(),
      lastname: new FormControl()
    });
    if (this.loggedIn) {
      let self: any = this;
      self.catalogService.getAllProducts().subscribe((res: any) => {
        console.log('RES', res);
        self.products = res;
        this.dataSource = new MatTableDataSource(res);
      });
      self.catalogService.getAllCategories().subscribe((res: any) => {
        console.log('RES', res)
        self.categories = res;
      });
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}

export class ProductDataSource extends DataSource<any> {
  constructor(private products: any) {
    super();
  }
  connect(): Observable<any[]> {
    return Observable.of(this.products);
  }
  disconnect() { }
}

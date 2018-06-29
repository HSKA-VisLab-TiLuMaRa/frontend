import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CatalogService } from "./../catalog.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(
    private catalogService: CatalogService
  ) { }

  private searchForm: any;
  private products: any = [];


  ngOnInit() {
    this.searchForm = new FormGroup({
      categoryId: new FormControl(),
      productName: new FormControl()
    });
    let self:any = this;
    self.catalogService.getAllProducts().subscribe((res:any)=>{
      self.products = res;
    })
  }

}

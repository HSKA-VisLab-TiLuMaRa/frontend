import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { HttpService } from './http.service';

@Injectable()
export class UserService {

  constructor(private httpService: HttpService) { }

  private url:string = "http://localhost:8081/user-management-api/users";

  getOneUser(id:number){
    return this.httpService.get(this.url + "/" + id);
  }

  authUser(credentials:any){
    return this.httpService.post("url", credentials);
  }

  createUser(user){
    return this.httpService.post(this.url, user);
  }


}

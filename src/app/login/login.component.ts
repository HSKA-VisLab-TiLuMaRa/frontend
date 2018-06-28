import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from "./../user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  private authenticateForm: any;


  authenticate(form: any) {
    let self: any = this;
    self.router.navigate(['/catalog']);
    // this.userService.authUser(form).subscribe((res: any) => {
    //   self.httpService.setToken(res.data.Token);
    //   self.userService.getOnUser(self.httpService.getUserId()).subscribe((res2: any) => {
    //   });
    // });
  }

  ngOnInit() {
    this.authenticateForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

}

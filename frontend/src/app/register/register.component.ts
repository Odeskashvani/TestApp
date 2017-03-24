import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: 'my-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registerFailed: boolean = false;
  registerSuccess: boolean = false;
  registerMsg = '';
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }
  
  register(): void {
    this.registerFailed = false;
    this.registerSuccess = false;
    this.registerMsg = '';
    this.authenticationService.register(this.model.fullname, this.model.email, this.model.password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.registerSuccess = true;
          this.registerMsg = 'Registeration successful. Please Login.';
          setTimeout(() => {
            let link = ['./login'];
            this.router.navigate(link);
          }, 2000);
        } else {
          // login failed
          this.registerFailed = true;
          this.registerMsg = 'This Email is already Registered with us!';
        }
      });
  }
}


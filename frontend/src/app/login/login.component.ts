import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthenticationService } from "../authentication.service";



@Component({
    selector: 'my-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

    model: any = {};

    token: string;
    loginFailed: boolean = false;
    loginMsg = '';
    constructor(private router: Router, private authenticationService: AuthenticationService) {

    }

    ngOnInit() {
        if (this.authenticationService.checkCredentials()) {
            let link = ['./home'];
            this.router.navigate(link);
        }
    }


    login() {
        this.loginFailed = false;
        this.loginMsg = '';
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(result => {
                if (result == true) {
                    this.router.navigate(['./home']);
                } else {
                    this.loginFailed = true;
                    this.loginMsg = 'Failed! Invalid Email or Password.';
                }
            });
    }

}

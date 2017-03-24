import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { APP_CONFIG, IAppConfig } from './app.config';
import { User } from "./user";


@Injectable()
export class AuthenticationService {
    public token: string;
    private API: String;
    private headers: Headers;
    constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {

        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.API = config.apiEndpoint;
    }

    login(email, password): Observable<any> {
        return this.http.post(this.API + '/api/signin', JSON.stringify({ email: email, password: password }), { headers: this.headers })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let userResponse = response.json();
                let token = userResponse && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    // store email and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ fullname: userResponse.fullname, email: email, userid: userResponse.userid, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
    register(fullname, email, password): Observable<boolean> {
        return this.http.post(this.API + '/api/signup', JSON.stringify({ fullname: fullname, email: email, password: password }), { headers: this.headers })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let registerResponse = response.json();
                let result = registerResponse && response.json().success === true;
                if (result) {
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    checkCredentials() {
        let credentials = localStorage.getItem("currentUser");
        if (credentials !== null) {
            var jsonData = JSON.parse(credentials);
            if (jsonData.token === null) {
                return false;
            }
            return true; //checks if user have credentials prior
        }
        return false;
    }

    GetCurrentUserDetails(): any {
        let credentials = localStorage.getItem("currentUser");
        if (credentials !== null) {
            return JSON.parse(credentials);
        }
        return null;
    }

    UpdateProfile(userdata): Observable<boolean> {
        return this.http.post(this.API + '/api/update', JSON.stringify({ userdata: userdata }), { headers: this.headers })
            .map((response: Response) => {
                // Account verification successful 
                let updateResponse = response.json();

                let result = updateResponse && response.json().success === true;
                if (result) {
                    // return true to indicate Account verification success                   
                    localStorage.setItem('currentUser', JSON.stringify({ fullname: updateResponse.fullname, email: updateResponse.email, userid: updateResponse.userid, token: updateResponse.token }));
                    return true;
                } else {
                    // return false to indicate Account verification failure
                    return false;
                }
            });
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

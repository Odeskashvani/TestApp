import { OnInit, Component } from '@angular/core';
import { AuthenticationService } from "./authentication.service";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from "./user";
@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit {
  public user: User = new User();
  title = 'app works!';

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    
  }
  ngOnInit() {
    if (this.authenticationService.checkCredentials) {
      let link = ['./login'];
      this.router.navigate(link);
    }


  }

  IsAuthenticated(): boolean {
    return this.authenticationService.checkCredentials();
  }
  logout(): void {
    this.authenticationService.logout();
    let link = ['./login'];
    this.router.navigate(link);
  }
}

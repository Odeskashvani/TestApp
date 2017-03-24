import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthenticationService } from "../authentication.service";
import { User } from "../user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeFailed: boolean = false;
  homeMsg = '';
  homeSuccess: boolean = false;
  model = new User();

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.SetUserDetails();
  }

  SetUserDetails() {
    this.model = this.authenticationService.GetCurrentUserDetails();
  }

  ngOnInit() {
  }


  logout(): void {
    this.authenticationService.logout();
    let link = ['./login'];
    this.router.navigate(link);
  }

  UpdateProfile(): void {
    this.homeFailed = false;
    this.homeMsg = '';
    this.homeSuccess = false;
    this.authenticationService.UpdateProfile(this.model).subscribe(result => {
      if (result) {
        this.homeSuccess = true;
        this.homeMsg = "Profile Details Updated Successfully";
        this.SetUserDetails();
        this.ResetFlags();
      }
      else {
        this.homeFailed = true;
        this.homeMsg = "Unable to update Profile Details";
        this.ResetFlags();
      }
    });
  }

  ResetFlags() {
    setTimeout(() => {
      this.homeFailed = false;
      this.homeMsg = '';
      this.homeSuccess = false;
    }, 2000);
  }
}

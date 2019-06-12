import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  password: string;
  repassword: string;
  isLoading = false;
  private authStatusSub: Subscription;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus=> {
      this.isLoading = false;
    });
  }

  onSignup(form: NgForm) {
    if ( form.invalid ) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.name, form.value.dob, form.value.email, form.value.password)
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}

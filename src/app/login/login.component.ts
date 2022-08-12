import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertService} from "../services/alert.service";
import {AuthService} from "../services/auth.service";
import {COMMON_ERROR_MESSAGE} from "../CommonMessages";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    if (this.authService.isUserAuthenticated()) {
      this.router.navigateByUrl('/issues');
    }
    this.loginFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        login: new FormControl('',
          [Validators.required, Validators.minLength(2)]),
        password: new FormControl('',
          [Validators.required, Validators.minLength(2)])
      })
    });
  }

  login() {
    this.authService.login(this.loginFormGroup.get('user')!.get('login')!.value, this.loginFormGroup.get('user')!.get('password')!.value)
      .subscribe(
        response => {
          this.authService.setToken(response.token);
          this.router.navigateByUrl('/chat-channels');
        },
        error => {
          this.alertService.error(COMMON_ERROR_MESSAGE);
        }
      );
  }

  logout() {
    this.authService.logout();
  }
}

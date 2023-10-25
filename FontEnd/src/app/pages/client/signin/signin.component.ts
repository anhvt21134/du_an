
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interface/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  isSubmitted = false;
  errorMessage = '';
  userForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  onHandleSignin() {
    this.isSubmitted = true;
    this.errorMessage = '';

    if (this.userForm.valid) {
      const user: IUser = {
        email: this.userForm.value.email || '',
        password: this.userForm.value.password || '',
      };

      this.userService.signin(user).subscribe(
        response => {
          localStorage.setItem('user', JSON.stringify(response));
          const storedUser: any = localStorage.getItem('user');
          const { user } = JSON.parse(storedUser);
          if (user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error => {
          this.errorMessage = 'Failed to sign in. Please check your credentials and try again.';
          console.error('Error signing in:', error);
        }
      );
    }
  }
}

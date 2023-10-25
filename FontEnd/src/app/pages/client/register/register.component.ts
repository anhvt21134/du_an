import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/interface/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  userForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
  });

  equalToPassword: ValidatorFn;

  constructor(
    private UserService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.equalToPassword = this.customEqualToPasswordValidator.bind(this);
  }

  customEqualToPasswordValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const password = this.userForm.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { notEqual: true };
  }

  onHandleSubmit() {
    if (this.userForm.valid) {
      const user: IUser = {
        name: this.userForm.value.name || '',
        email: this.userForm.value.email || '',
        password: this.userForm.value.password || '',
        confirmPassword: this.userForm.value.confirmPassword || '',
      };

      this.UserService.signup(user).subscribe(
        (response) => {
          console.log('Đăng kí tài khoản thành công:', response);
          this.toastr.success('Đăng kí tài khoản thành công');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Đăng kí tài khoản thất bại:', error);
        }
      );
    } else {
      // Hiển thị thông báo lỗi cho các trường không hợp lệ
      Object.keys(this.userForm.controls).forEach((field) => {
        const control = this.userForm.get(field);
        if (control) {
          control.markAsDirty();
          control.markAsTouched();
        }
      });
    }
  }
}

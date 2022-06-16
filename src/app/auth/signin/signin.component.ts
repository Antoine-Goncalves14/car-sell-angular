import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm!: FormGroup;

  constructor(
    private FormBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initSignInForm();
  }

  initSignInForm(): void {
    this.signInForm = this.FormBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmitSignInForm(): void {
    this.authService.signInUser(this.signInForm.value.email, this.signInForm.value.password)
      .then(() => {
        this.router.navigate(['/admin', 'dashboard']);
      }).catch(console.error);
  }

}

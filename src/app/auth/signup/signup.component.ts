import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initSignUpForm();
  }

  initSignUpForm(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required]],
      cguCheck: [false, [Validators.required]],
    });
  }

  onSubmitSignUpForm(): void {
    this.authService.signUpUser(this.signUpForm.value.email, this.signUpForm.value.password)
      .then(user => {
        // REDIRIGER L'UTILISATEUR
        this.router.navigate(['/admin', 'dashboard']);
      }).catch(console.error);
  }

}

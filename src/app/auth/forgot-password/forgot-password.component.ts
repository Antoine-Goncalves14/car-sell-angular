import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;

  message!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initForgotPasswordForm();
  }

  initForgotPasswordForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }

  onSubmitForgotPasswordForm(): void {
    this.authService.sendPasswordResetEmail(this.forgotPasswordForm.value.email)
      .then(() => {
        this.message = 'L\'e-mail de réinitialisation du mot de passe a été envoyé à votre adresse.';
      }).catch(console.error);
  }

}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Message, MessageService } from "primeng/api";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  msgs!: Message[];
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required, Validators.email
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  login(): void {
    this.submitted = true;
    this.msgs = [];

    if (!this.loginForm.valid) {
      return;
    }

    this.authService.signIn(this.loginForm.value).subscribe({
      next: (res: boolean) => {
        if (res) {
          this.router.navigate(['/']);
        }
      },
      error: (error: string) => {
        this.messageService.add({
          severity: 'warn',
          detail: error,
        });
      }
    });
  }

}
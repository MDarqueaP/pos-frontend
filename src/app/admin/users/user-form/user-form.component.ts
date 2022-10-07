import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Message, MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { AppUser, UserRole } from "src/app/models/AppUser";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  form!: FormGroup;
  submitted: boolean = false;
  msgs!: Message[];
  user: AppUser | undefined;
  userRoles: UserRole[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required
      ]],
      password: ['', Validators.compose([
        this.user !== undefined ? Validators.required : null
      ])],
      roles: [[], []]
    });

    this.user = this.config.data.user;
    this.userRoles = this.config.data.userRoles;

    if (this.user !== undefined) {
      this.form.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: '',
        roles: this.user.roles
      });
    }
  }

  submit(): void {
    this.submitted = true;

    if (!this.form.valid) {
      return;
    }

    if (this.user === undefined) {
      this.userService.newUser(this.form.value)
      .subscribe({
        next: (res: Boolean) => {
          if (res) {
            this.ref.close('Usuario creado');
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

    if (this.user !== undefined) {
      this.userService.updateUser(this.form.value, this.user.id)
      .subscribe({
        next: (res: Boolean) => {
          if (res) {
            this.ref.close('Usuari actualizado');
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
  
}
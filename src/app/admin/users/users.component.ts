import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { map } from "rxjs";
import { AppUser, Role, UserRole } from "src/app/models/AppUser";
import { UserService } from "src/app/services/user.service";
import { UserFormComponent } from "./user-form/user-form.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: AppUser[] = [];
  userRoles: UserRole[] = [];

  ref: DynamicDialogRef = new DynamicDialogRef;

  constructor(
    private userService: UserService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllRoles();
  }

  getAllUsers(): void {
    this.userService.getAllUsers()
      .subscribe({
        next: (res: AppUser[]) => {
          this.users = res;
        },
        error: (message: string) => {
          console.log(message);
        }
      });
  }

  getAllRoles(): void {
    this.userService.getAllRoles().pipe(
      map((res: any) => {
        return res.map((role: Role) => {
          return { role: role };
        });
      })
    ).subscribe({
      next: (res: UserRole[]) => {
        this.userRoles = res;
      },
      error: (message: string) => {
        console.log(message);
      }
    });
  }

  newUser(): void {
    this.ref = this.dialogService.open(UserFormComponent, {
      header: 'Nuevo',
      width: '70%',
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
      data: {
        userRoles: this.userRoles,
        user: undefined
      }
    });
    this.ref.onClose.subscribe((message: string) => {
      if (message) {
        this.messageService.add({ severity: 'info', detail: message });
        this.getAllUsers();
      }
    });
  }

  edit(user: AppUser): void {
    this.ref = this.dialogService.open(UserFormComponent, {
      header: 'Editar',
      width: '70%',
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
      data: {
        userRoles: this.userRoles,
        user: user
      }
    });
    this.ref.onClose.subscribe((message: string) => {
      if (message) {
        this.messageService.add({ severity: 'info', detail: message });
        this.getAllUsers();
      }
    });
  }

}
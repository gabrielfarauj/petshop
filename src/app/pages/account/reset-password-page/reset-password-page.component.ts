import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { CustomValidator } from 'src/app/validators/validators';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.css',
})
export class ResetPasswordPageComponent {
  public form!: FormGroup;
  public busy = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      cpf: [
        '',
        Validators.compose([
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.required,
          CustomValidator.isCpf(),
        ]),
      ],
    });
  }

  submit() {
    this.busy = true;
    this.dataService.resetPassword(this.form.value).subscribe(
      (data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Senha Restaurada');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        this.busy = false;
      }
    );
  }
}

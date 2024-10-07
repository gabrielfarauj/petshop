import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidator } from '../../../validators/validators';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
})
export class SignupPageComponent {
  public form!: FormGroup;
  public busy = false;

  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.minLength(12),
          Validators.maxLength(120),
          Validators.required,
          CustomValidator.EmailValidator,
        ]),
      ],

      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(70),
        ]),
      ],

      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ]),
      ],

      cpf: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(14),
          Validators.minLength(14),
          CustomValidator.isCpf(),
        ]),
      ],
    });
  }

  submit(){
    this.busy = true;
    this.service.create(this.form.value).subscribe(
      (data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Bem Vindo'),
          this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        this.busy = false;
      }
    );
  }

}

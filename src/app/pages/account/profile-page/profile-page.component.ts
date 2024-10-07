import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { CustomValidator } from 'src/app/validators/validators';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  form!: FormGroup;
  busy = false;

  constructor(private fb: FormBuilder, private dataService: DataService, private toastr: ToastrService) {
    this.form = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.minLength(8),
          Validators.maxLength(70),
          Validators.required,
        ]),
      ],
      cpf: [{ value: '', disabled: true }],
      email: [
        '',
        Validators.compose([
          Validators.minLength(12),
          Validators.maxLength(120),
          Validators.required,
          CustomValidator.EmailValidator,
        ]),
      ],
    });
  }

  ngOnInit() {
    this.busy = true;
    this.dataService.getProfile().subscribe(
      (data: any) => {
        this.form.controls['name'].setValue(data.name);
        this.form.controls['cpf'].setValue(data.document);
        this.form.controls['email'].setValue(data.email);
        this.busy = false;
      },
      (error) => {
        console.log(error);
        this.busy = false;
      }
    );
  }

  submit(){
    this.busy = true;
    this.dataService.updateProfile(this.form.value).subscribe((data: any) => {
      this.busy = false;
      this.toastr.success(data.message, 'Atualização Realizada com Sucesso!')
    },
  (error) => {
    console.log(error);
    this.busy = false;
  })
  }
}

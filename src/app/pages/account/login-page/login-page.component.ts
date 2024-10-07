import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../../validators/validators';
import { SecurityUtil } from '../../../utils/security.utils';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  public form!: FormGroup;
  public busy = false;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.maxLength(14),
          Validators.minLength(14),
          Validators.required,
          CustomValidator.isCpf(),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required,
        ]),
      ],
    });
  }
  ngOnInit() {
    const token = SecurityUtil.getToken();
    if (token) {
      this.busy = true;
      this.dataService.refreshToken().subscribe({
        next: (v: any) => {
          this.setUser(v.costumer, v.token);
          this.busy = false;
        },
        error: (e) => {
          localStorage.clear();
          this.busy = false;
        },
      });
    }
  }

  // Formas de armazanar o tokem
  // Variavel Global, Session Storage, Local Storage Link: https://balta.io/player/assistir/5d493a0c-7c21-3e60-b8eb-f5ef00000000/c961cfc2-2c94-42ed-865c-000071870217

  submit() {
    this.busy = true;
    this.dataService.authenticate(this.form.value).subscribe({
      next: (v: any) => {
        this.setUser(v.customer, v.token);
        // localStorage.setItem('petshop.token', v.token) //Linha de cima subistituiu essa;
        this.busy = false;
      },
      error: (e) => {
        console.log(e);
        this.busy = false;
      },
    });
  }

  // Depois do usuário ter logado ou se ja houver um usuário, chama esta função e joga ele para pagina principal
  setUser(user: User, token: string) {
    SecurityUtil.User(user, token);
    this.router.navigate(['/']);
  }

}

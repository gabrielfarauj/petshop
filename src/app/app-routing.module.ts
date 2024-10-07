import { NgModule } from '@angular/core';
import { mapToCanActivate, RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/account/login-page/login-page.component';
import { FramePageComponet } from './pages/master/frame-page';
import { SignupPageComponent } from './pages/account/signup-page/signup-page.component';
import { ResetPasswordPageComponent } from './pages/account/reset-password-page/reset-password-page.component';
import { ProductsPageComponent } from './pages/store/products-page/products-page.component';
import { PetsPageComponent } from './pages/store/pets-page/pets-page.component';
import { CartPageComponent } from './pages/store/cart-page/cart-page.component';
import { AuthService } from './services/auth.service';
import { ProfilePageComponent } from './pages/account/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'signup',
    component: SignupPageComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordPageComponent,
  },
  {
    path: 'account',
    component: FramePageComponet,
    canActivate: mapToCanActivate([AuthService]),
    children: [
      { path: 'profile', component: ProfilePageComponent },
      { path: 'pets', component: PetsPageComponent },
    ],
  },
  {
    path: '',
    component: FramePageComponet,
    canActivate: mapToCanActivate([AuthService]),
    children: [
      { path: '', component: ProductsPageComponent },
      { path: 'cart', component: CartPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginPageComponent } from './pages/account/login-page/login-page.component';
import { ResetPasswordPageComponent } from './pages/account/reset-password-page/reset-password-page.component';
import { SignupPageComponent } from './pages/account/signup-page/signup-page.component';
import { CartPageComponent } from './pages/store/cart-page/cart-page.component';
import { PetsPageComponent } from './pages/store/pets-page/pets-page.component';
import { ProductsPageComponent } from './pages/store/products-page/products-page.component';
import { FramePageComponet } from './pages/master/frame-page';
import { ProductCardComponent } from './components/store/product-card/product-card.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { MaskDirective } from './directives/mask.directive';
import { ProfilePageComponent } from './pages/account/profile-page/profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginPageComponent,
    ResetPasswordPageComponent,
    SignupPageComponent,
    PetsPageComponent,
    ProductsPageComponent,
    CartPageComponent,
    FramePageComponet,
    ProductCardComponent,
    LoadingComponent,
    MaskDirective,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Sempre usado para fazer requisição
    ReactiveFormsModule,

    BrowserAnimationsModule, // animations
    ToastrModule.forRoot(),

    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
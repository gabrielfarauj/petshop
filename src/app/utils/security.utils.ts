import { environment } from '../../environments/environments';
import { User } from '../models/user.model';

export class SecurityUtil {
  private static jsonUser: string;
  // private static petshopUser = 'petshopuser';
  // private static petshopToken = 'petshoptoken';
  private static petshopToken = environment.petshopToken;
  private static petshopUser = environment.petshopUser;

  public static User(user: User, token: string) {
    this.jsonUser = JSON.stringify(user);
    const data = JSON.stringify(user);

    localStorage.setItem(this.petshopUser, data);
    localStorage.setItem(this.petshopToken, token);
  }

  public static setUser(user: User) {
    const data = JSON.stringify(user);
    localStorage.setItem(this.petshopUser, data);
  }

  public static setToken(token: string) {
    localStorage.setItem(this.petshopToken, token);
  }

  public static getUser(): User | null {
    const data = localStorage.getItem(this.petshopUser);
    if (data) {
      return JSON.parse(data);
    } else {
      return null
    }
  }

  public static getToken(): string | boolean {
    const data = localStorage.getItem(this.petshopToken);
    if (data) {
      return data;
    } else {
      return false;
    }
  }

  public static hasUser(): boolean {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  public static clear() {
    localStorage.removeItem(this.petshopUser);
    localStorage.removeItem(this.petshopToken);
  }
}

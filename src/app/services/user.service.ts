import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

        // Paso directamente lo que tenga el formulario de login, sin tener una interfaz especifica para mandar
  signup(data: any): Observable<any> {
    return this.httpClient.post(this.url + "/user/signup", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  forgotPassword(data: any): Observable<any> {
    return this.httpClient.post(this.url + "/user/forgot-password", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(this.url + "/user/login", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  checkToken(): Observable<any> {
    return this.httpClient.get(this.url + "/user/check-token");
  }

  changePassword(data: any): Observable<any> {
    return this.httpClient.post(this.url + "/user/change-password", data, { 
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getAllUsers() {
    return this.httpClient.get(this.url + "/user/getUsers");
  }

  updateStatus(data: any) {
    return this.httpClient.post(this.url + "/user/update-status", data, { 
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

}
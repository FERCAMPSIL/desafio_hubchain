import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';
import { Ticket } from './ticket';

@Injectable()
export class TicketService {
  private token: string;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.authService.token.subscribe(res => this.token = res);
  }

  getTickets(): Observable<Ticket[]> {
    const url = `${environment.apiUrl}/ticket`;
    return this.http.get<Ticket[]>(url, {
      headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  tickets: Ticket[] = [];
  dataInvalid = false;
  formErrors = [];
  formSubmitting = false;

  constructor(private ticketService: TicketService) {
  }

  ngOnInit() {
    this.ticketService.getTickets()
      .subscribe(data => {
        this.tickets = data['data'];
      }, (err: HttpErrorResponse) => {
        this.dataInvalid = true;
        this.formSubmitting = false;
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          this.formErrors.push(err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          if (err.status === 0) {
            this.formErrors.push('please check your backend server.');
          } else {
            const errors = JSON.parse(err.error);
            const items = [];
            for (const key in errors) {
              if (errors.hasOwnProperty(key)) {
                items.push(errors[key]);
              }
            }
            for (const k in items[1]) {
              if (items[1].hasOwnProperty(k)) {
                this.formErrors.push(items[1][k][0]);
              }
            }
          }
        }
      });
  }

}

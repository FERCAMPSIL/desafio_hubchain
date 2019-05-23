import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket.component';
import { TicketService } from './ticket.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TicketComponent],
  providers: [TicketService]
})
export class TicketModule {
}

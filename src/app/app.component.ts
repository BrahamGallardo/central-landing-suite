import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgToastModule, ToasterPosition } from 'ng-angular-popup';
import { NgxSpinnerModule } from "ngx-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgToastModule,
    NgxSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  ToasterPosition = ToasterPosition;
  
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,MenuComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crud-book-app';
  alertMessage: string | null = null;
  alertClass: string = '';

  showAlert(message: string, type: 'success' | 'danger' | 'info' | 'warning'): void {
    this.alertMessage = message;
    this.alertClass = `alert-${type}`;
    setTimeout(() => this.closeAlert(), 3000); // Fecha após 3 segundos
  }

  closeAlert(): void {
    this.alertMessage = null;
  }
}


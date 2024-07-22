import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-db-connection-form',
  standalone: true,
  templateUrl: './db-connection-form.component.html',
  styleUrls: ['./db-connection-form.component.css'],
  imports: [FormsModule]
})
export class DbConnectionFormComponent {
  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(form: any): void {
    const params = {
      host: form.value.host,
      port: form.value.port,
      username: form.value.username,
      password: form.value.password,
      database: form.value.database
    };

    this.http.post<any>('http://localhost:8000/api/db-connect', params).subscribe(
      response => {
        this.router.navigate(['/success'], { state: { data: response } });
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
}

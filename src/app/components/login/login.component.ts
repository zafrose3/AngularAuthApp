import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // ✅ Import Router
import { HttpClient } from '@angular/common/http';  // ✅ Import HttpClient

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private http: HttpClient, private router: Router) {  // ✅ Inject dependencies
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post('http://localhost:5000/login', this.loginForm.value).subscribe(
        (response: any) => {
          console.log('Login successful', response);
          
          // Store user details in sessionStorage
          sessionStorage.setItem('user', JSON.stringify(response.user));

          // Redirect to dashboard
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Login failed', error);
          alert('Invalid credentials. Please try again.');
        }
      );
    }
  }
}

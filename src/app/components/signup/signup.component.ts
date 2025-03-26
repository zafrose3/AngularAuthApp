import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [NgIf]
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log("Signup form submitted!", this.signupForm.value);

    if (this.signupForm.valid) {
      // Save user data (this is just a simulation)
      localStorage.setItem('user', JSON.stringify(this.signupForm.value));

      alert("Signup successful! You can now log in.");
      this.router.navigate(['/login']); // Redirect to login page
    } else {
      alert("Please fill in all fields correctly.");
    }
  }
}

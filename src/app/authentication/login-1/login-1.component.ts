



import socialIcons from './../../../assets/data/pages/social-items.json';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../serv/login-service.service';

@Component({
  templateUrl: './login-1.component.html'
})
export class Login1Component implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  error = false;
  socialMediaButtons = socialIcons.socialMediaButtons;
  passwordVisible = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private location: Location, private LoginServiceService: LoginServiceService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false]
    });
  }

  // submitForm(): void {
  //   if (this.loginForm.valid) {
  //     this.isLoading = true;
  //     this.LoginServiceService.login(this.loginForm.value).subscribe(
  //       response => {
  //         // Success
  //         console.log('Login successful', response);
  //         this.router.navigate(['/dashboard/demo-one']).then(() => {
  //           window.location.reload();
  //         });
  //       },
  //       error => {
  //         // Error
  //         console.error('Login failed', error);
  //         this.error = true;
  //       },
  //       () => {
  //         this.isLoading = false;
  //       }
  //     );
  //   } else {
  //     Object.values(this.loginForm.controls).forEach(control => {
  //       if (control.invalid) {
  //         control.markAsDirty();
  //         control.updateValueAndValidity({ onlySelf: true });
  //       }
  //     });
  //   }
 
  // }


  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.LoginServiceService.login(this.loginForm.value).subscribe(
        response => {
          // Succès
          console.log('Login successful', response);
          this.router.navigate(['/dashboard/demo-one']).then(() => {
            window.location.reload();
          });
        },
        error => {
          // Erreur
          console.error('Login failed', error);
          this.error = true;
          this.errorMessage = 'Invalid username or password'; // Affiche le message d'erreur
          this.isLoading = false; // Assurez-vous de stopper le chargement
        },
        () => {
          this.isLoading = false; // Assurez-vous que le chargement est arrêté
        }
      );
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}


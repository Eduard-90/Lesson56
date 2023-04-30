import { Component, OnInit } from '@angular/core';
import { FormGroup, NgModel, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z0-9]+$'),
      ]),
      email: new FormControl(
        '',
        [Validators.required, Validators.email],
        [this.checkEmail]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  checkEmail(control: any): Promise<any> {
    return new Promise(async (resolve) => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const users = await response.json();
      setTimeout(() => {
        const email = control.value;
        const emailExists = users.some((user: any) => user.email === email);
        resolve(emailExists ? { emailExists: true } : null);
      }, 2000);
    });
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}

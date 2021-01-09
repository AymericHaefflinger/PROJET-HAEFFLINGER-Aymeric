import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserAuth, User } from '../../models/user/user';
import { toast } from 'materialize-css';
import { Store, Select } from "@ngxs/store";
import { AddUser, NewJwt } from "../../models/user/user.action";
import { UserState } from "../../models/user/user.state";
import { Router } from '@angular/router';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @Output('onUserChanged') onFormSubmit = new EventEmitter<UserAuth>();
  
  
  passwordValidator = (control: AbstractControl) : ValidationErrors => {
    if(!control.value)
      return null;

    if(!this.password)
      return null;
    return control.value === this.password.value ? null : ({'invalid': true});
  }

  compteForm : FormGroup = this.fb.group({
    mail : ['monMail@mail.com', [Validators.required, this.emailValidator]],
    password: ['modepass', [Validators.required]],
  })

  constructor(private fb : FormBuilder,
     private httpClient: HttpClient,
     private store: Store,
     private router: Router) { }

  get mail() {return this.compteForm.get('mail');}
  get password() {return this.compteForm.get('password');}

  onSubmit() : void{
    
    let user : UserAuth = new UserAuth( this.mail.value, this.password.value);
    this.onFormSubmit.emit(user);

    let body = new URLSearchParams();
    body.set('mail', this.mail.value);
    body.set('mdp', this.password.value);

    this.httpClient.post<any>("/api/user/login", body.toString(),
      { headers: { 'content-type': 'application/x-www-form-urlencoded' }, observe: 'response' }, )
    .subscribe(response => {
      this.apiSuccess(response, response.headers.get('Authorization')); 
     }, error => {
      toast({html: 'Problème de connexion ou d\'identifiant!', classes: 'rounded'});
     });
  }


  apiSuccess(data, jwt){
    toast({html: 'Connexion réussie!', classes: 'rounded'});
    this.addUser(data.body.user, jwt);
    this.router.navigate(['/compte']);
  }

  addUser(u: User, j: string) {
    this.store.dispatch(new AddUser(u)).subscribe();
    this.store.dispatch(new NewJwt("Bearer " + j));
  }

  ngOnInit() {
  }
  
  test(){
    console.log(this.compteForm.value);
  }
  // validators
  noNumberValidator(control: AbstractControl) : ValidationErrors{
    const reg : RegExp = /[0-9]/
    if(!control.value)
      return null;

    return !reg.test(control.value) ? null : ({'number': true});
  }

  emailValidator(control: AbstractControl) : ValidationErrors{
    const reg : RegExp = /[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+/
     
    if(!control.value)
      return null;

    return reg.test(control.value) ? null : ({'notAnEmailAddress': true});
  }
}

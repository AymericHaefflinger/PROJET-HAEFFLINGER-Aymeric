import { Component, Input, OnInit } from "@angular/core";
import { EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, ReactiveFormsModule  } from '@angular/forms';
import { from, of, interval } from "rxjs";
import { filter } from "rxjs/operators";
import { HttpServiceService } from "../../../http-service.service";
import { Article } from "../../models/article/article";
import { Store, Select } from "@ngxs/store";
import { ArticleState } from "../../models/article/article.state";
import { Observable } from "rxjs";
import { AddArticle } from "../../models/article/article.action";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../models/user/user";
import { UserState } from "../../models/user/user.state";
import { HttpClient } from '@angular/common/http';
import { toast } from 'materialize-css';



@Component({
  selector: "compte",
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})

export class CompteComponent {

  user$: Observable<User>;
  oldMail : string;

  constructor(private store: Store,
    private fb : FormBuilder,
    private http: HttpClient) { }

  ngOnInit() {
    this.user$ = this.store.select(UserState.getUser);
    var testNull = null;
    this.user$.subscribe(res => testNull = res);
    if(testNull)
      this.initForm();
    this.user$.subscribe(res => console.warn(res));
  }
  
  initForm(){
      var name$;
      var surname$;
      var mail$;
      var password$;
      this.user$.subscribe(res => name$=(res["nom"]));
      this.user$.subscribe(res => surname$=(res["prenom"]));
      this.user$.subscribe(res => mail$=(res["mail"]));
      this.user$.subscribe(res => password$=(res["mdp"]));
      this.compteForm.patchValue({
        name: name$,
        surname: surname$,
        mail: mail$,
        password: password$
      })
      this.oldMail = mail$;
  }

  @Output('onUserChanged') onFormSubmit = new EventEmitter<User>();

  compteForm : FormGroup = this.fb.group({
    name : ['' , [Validators.required, this.noNumberValidator]],
    surname: ['', [Validators.required, this.noNumberValidator]],
    mail : ['', [Validators.required, this.emailValidator]],
    password: ['', [Validators.required]],
  })
  
  get name() {return this.compteForm.get('name'); }
  get surname() { return this.compteForm.get('surname');}
  get mail() {return this.compteForm.get('mail');}
  get password() {return this.compteForm.get('password');}

  onSubmit() : void{
  
    let body = new URLSearchParams();
    body.set('oldMail', this.oldMail);
    body.set('nom', this.name.value);
    body.set('prenom', this.surname.value);
    body.set('mail', this.mail.value);
    body.set('mdp', this.password.value);
  
     this.http.post<any>("/api/user/modify", body.toString(),
     { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
     .subscribe(data => {
      toast({html: 'Connexion réussie!', classes: 'rounded'});
     }, error => {
      toast({html: 'Mail déja utilisé ou problème dans les champs remplis!', classes: 'rounded'});
     });
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

  passwordValidator = (control: AbstractControl) : ValidationErrors => {
    if(!control.value)
      return null;
  }

}





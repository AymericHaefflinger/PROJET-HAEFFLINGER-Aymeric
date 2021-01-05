export class User{
    nom: string;
    prenom: string;
    mail: string;
    password: string;
  
    constructor(nom?: string, prenom?: string, mail?: string, password?: string){
      this.nom=null; this.prenom=null; this.mail=null; this.password=null;
      if(nom)
        this.nom = nom;
      if(prenom)
        this.prenom = prenom;
      if(mail)
        this.mail = mail;
      if(password)
        this.password = password;
    }
  }
  export class userStateModel {
    user: User;
  }
  

  export class UserAuth{
    Mail: string;
    Password: string;
  
    constructor(mail: string, password: string){

      this.Mail = mail;
      this.Password = password;
    }
  }
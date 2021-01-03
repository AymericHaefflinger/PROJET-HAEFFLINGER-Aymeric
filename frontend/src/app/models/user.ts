export class User{
    name: string;
    surname: string;
    mail: string;
    password: string;
  
    constructor(name: string, surname: string, mail: string, password: string){
  
      this.name = name;
      this.surname = surname;
      this.mail = mail;
      this.password = password;
    }
  }
  export class userStateModel {
    user: User[];
  }
  

  export class UserAuth{
    Mail: string;
    Password: string;
  
    constructor(mail: string, password: string){

      this.Mail = mail;
      this.Password = password;
    }
  }
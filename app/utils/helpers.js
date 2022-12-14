/*export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}*/

export const validateEmail=(mail,fn)=>{
    if(mail == "" || mail == null){
      console.log("INFO MAIL INVALIDA")
      fn("El campo mail no puede estar vacio")
    }else{
        let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if(!regex.test(mail)){
        console.log("Direccion de correo invalida");
        fn("Direccion de correo invalida");
        return false;
      }else{
      fn("");
      }
      }
    }

export const validateName=(name,fn)=>{

    if(name == "" || name == null){
      console.log("INFO name INVALIDA")
      fn("El campo nombre no puede estar vacio")
      
    }else{
      if(name.length<3){
        fn("El nombre no puede tener 3 o menos digitos")
      }else{
          fn("");
      }
      }
    }

    export const validateUsername=(username,fn)=>{

        if(username == "" || username == null){
          console.log("INFO name INVALIDA")
          fn("El campo nombre de usuario no puede estar vacio")
          
        }else{
          if(username.length<3){
            fn("El nombre de usuario no puede tener 3 o menos digitos")
          }else{
              fn("");
          }
          }
        }

    export const validateLastname=(lastName,fn)=>{
      if(lastName == "" || lastName == null){
        console.log("INFO lastName INVALIDA")
        fn("El campo apellido no puede estar vacio")
      }else{
        if(lastName.length<3){
          fn("El apellido no puede tener 3 o menos digitos")
        }else{
            fn("");
        }
        }
    }

    export const validatePhone=(phone,fn)=>{
        if(phone == "" || phone == null){
          console.log("INFO phone INVALIDA")
          fn("El campo telefono no puede estar vacio")
        }else{
          let regex = new RegExp(/^[0][9][0-9]{8}$/gmi);
          if(phone.length<10){
            fn("El numero de telefono no puede tener menos 9 digitos ")
          }else{
            if(!regex.test(phone)){
              console.log("Direccion de correo invalida");
              fn("El campo telefono no admite el numero digitado");
              return false;
            }else{
            fn("");
            }
          }
          }
        }

        export const validateHomePhone=(phone,fn)=>{
            if(phone == "" || phone == null){
              console.log("INFO home-phone INVALIDA")
              fn("El campo telefono convencional no puede estar vacio")
            }else{
              if(phone.length<7){
                fn("El telefono convencional no puede tener menos 7 digitos ")
              }else{
                fn("");
              }
              }
            }

            export const validateAddress=(address,fn)=>{
                if(address == "" || address == null){
                  console.log("INFO ADDRESS INVALIDA")
                  fn("El campo dirección no puede estar vacio")
                }else{
                  if(address.length<4){
                    fn("La dirección no puede tener menos de 4 caracteres ")
                  }else{
                    fn("");
                  }
                  }
                }

                export const validatePasswords=(password,password_confirmation,fn)=>{
                  var myregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; 
                    if(password == "" || password_confirmation == null){
                      console.log("INFO ADDRESS INVALIDA")
                      fn("El campo contraseña no puede estar vacio")
                    }else{
                      if(password!=password_confirmation){
                        fn("Las contraseñas no coinciden ")
                      }else{
                        fn("");
                        
                        if(myregex.test(password) && myregex.test(password_confirmation)){
                            console.log("CONTRASEÑA CORRECTA")
                            fn("");
                        }else{
                          console.log("CONTRASEÑA INCORRECTA")
                            fn("La contraseña debe contener al menos una letra mayuscula, un numero y un caracter especial");
                        }   
                      }
                      }
                    }

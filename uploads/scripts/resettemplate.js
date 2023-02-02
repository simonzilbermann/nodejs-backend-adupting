
var bool1 =false;
  var bool2 = false;
   var bool3 = false;
    var bool4 = false;
var myInput = document.getElementById("tmppassword");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
// Validate lowercase letters
var lowerCaseLetters = /[a-z]/g;
if(myInput.value.match(lowerCaseLetters)) {
  letter.classList.remove("invalid");
  letter.classList.add("valid");
  bool1 = true; 
} else {
  letter.classList.remove("valid");
  letter.classList.add("invalid");
}

// Validate capital letters
var upperCaseLetters = /[A-Z]/g;
if(myInput.value.match(upperCaseLetters)) {
  capital.classList.remove("invalid");
  capital.classList.add("valid");
  bool2 = true ;
} else {
  capital.classList.remove("valid");
  capital.classList.add("invalid");
}

// Validate numbers
var numbers = /[0-9]/g;
if(myInput.value.match(numbers)) {
  number.classList.remove("invalid");
  number.classList.add("valid");
  bool3 = true; 
} else {
  number.classList.remove("valid");
  number.classList.add("invalid");
}

// Validate length
if(myInput.value.length >= 8) {
  length.classList.remove("invalid");
  length.classList.add("valid");
  bool4 = true;
} else {
  length.classList.remove("valid");
  length.classList.add("invalid");
}
}



           const email=document.getElementById("email").value;
           const password=document.getElementById("psw").value;
               const tmppassword=document.getElementById("tmppassword").value;
           
function validatePassword(){

if (bool1 && bool2 && bool3 && bool4){
 reset();
}
  else {
  
    alert("validation not match");
  }
}

tmppassword.onchange = validatePassword;





 function reset(){
 
      const email=document.getElementById('email').value;
      const validationcode=document.getElementById('tmppassword').value;
      const newpass=document.getElementById('psw').value;
      var p = newpass+"";
      flag= true;
 
       if (p.length < 8 ||  p.search(/[a-z]/i) < 0  || p.search(/[0-9]/) < 0) {
        flag =false;
            document.getElementById("literal").innerHTML = "סיסמא חייבת להיות באורך 8 תווים ולהכיל אות גדולה אות קטנה ומספר ";
           setTimeout(()=>{window.location.reload();},2000);
      }
      if(email== ""|| validationcode == "" || newpass ==""){
        flag =false;
          document.getElementById("literal").innerHTML="שדות לא יכולות להיות ריקים";
          setTimeout(()=>{window.location.reload();},2000);
      }
  

      if(flag){
       
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
              var urlencoded = new URLSearchParams();
              urlencoded.append("operation", "reset password");
              urlencoded.append("request", email +" excute reset with email : " +email + "temporary pass: " +validationcode +"newpass: "+newpass);
              urlencoded.append("deviceinfo", window.navigator.userAgent);
          var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
          };

          fetch("/user/res", {
            method:'POST',
            body:new URLSearchParams({email,validationcode,newpass})}).then((res)=>{return res.json()}).then((data)=>{
                 urlencoded.append("response", JSON.stringify(data));
                fetch("/logs/slog", requestOptions).then((res)=>{ return res.json()}).then((data2)=>{ alert(data.msg)})
                      if(data.msg==1){                        
                       setTimeout(()=>{window.location.replace('/login');},1000);
                      }
                      else{                        
                        setTimeout(()=>{window.location.reload();},1000);
                        
                      }
          })
      }
    }

 
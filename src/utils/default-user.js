




let user = JSON.parse(localStorage.getItem("User")) 

let email = ""
if(user && user.user){
  email = user.user.emailAddress
}

export default {
  email:   email,
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
}

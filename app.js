// global variables

let signUp = document.querySelector(`#signUp`);
let cancel_signUp = document.querySelector(`#cancel_signUp`);
let login = document.querySelector(`#login`);


// functions
function r_e(id) {
  return document.querySelector(`#${id}`)
}


// sign up user
r_e("signup_form").addEventListener('submit', (e) => {
  e.preventDefault();
  // grab the email and password combination from the form
  let email = r_e('signup_email').value;
  let password = r_e('signup_password').value;

  auth.createUserWithEmailAndPassword(email, password).then((user) => {
    r_e('signup_form').reset();
    r_e('mymodal_signUp').classList.remove('is-active');
    location.reload();
  }).catch(err => {
    mymodal_signUp.querySelector('.error').innerHTML = err.message
  })
})

// Login user
r_e("login_form").addEventListener('submit', (e) => {
  e.preventDefault();
  // grab the email and password combination from the form
  let email = r_e('login_email').value;
  let password = r_e('login_password').value;

  auth.signInWithEmailAndPassword(email, password).then((user) => {
    // console.log(`${user.user.email} is created!`)

    r_e('login_form').reset();
    r_e('mymodal_login').classList.remove('is-active')
    location.reload();
  }).catch(err => {
    mymodal_login.querySelector('.error').innerHTML = err.message
  })

})

// track user authentication status with onauthstatechanged

auth.onAuthStateChanged((user) => {
  // check if user signed in or out
  if (user) {
    // show user email in nav bar
    if (auth.currentUser.email == "admin@admin.com"){
      r_e('user_email').innerHTML = `<i class="fa-solid fa-user-gear"></i> : ` + auth.currentUser.email;
    } else {
       r_e('user_email').innerHTML = `<i class="fa-solid fa-user fa-1x"></i> : ` + auth.currentUser.email;
    }
   
    r_e('game_review').classList.remove('is-hidden')
    r_e('signUp').classList.add('is-hidden');
    r_e('login').classList.add('is-hidden')
    r_e('signout').classList.remove('is-hidden')
    r_e('post_reviews').addEventListener('click', () => {
      document.querySelector(`#wrapper`).style.height = null;
      document.querySelector(`#wrapper`).style.backgroundImage = "url('824805.jpg')";
      r_e("main").classList.remove("is-hidden")
      r_e("games_columns").classList.add("is-hidden")




      r_e("reviews_columns").classList.remove("is-hidden")
    })
  } else {
    // remove user email from nav bar
    r_e('user_email').innerHTML = "";
    r_e('game_review').classList.add('is-hidden')
    r_e('signout').classList.add('is-hidden')
    r_e('signUp').classList.remove('is-hidden');
    r_e('login').classList.remove('is-hidden')
    r_e('post_reviews').addEventListener(`click`, () => {
      alert("Please login to post reviews!")
    

    })
    r_e('games').addEventListener(`click`, () => {
      alert("Please login to view games!")
    

    })
  }
})



// sign out
document.querySelector(`#signout`).addEventListener(`click`, () => {
  auth.signOut().then((user) => {
    location.reload();
  })
})



cancel_signUp.addEventListener(`click`, () => {
  document.querySelector("#mymodal_signUp").classList.remove("is-active")

})


signUp.addEventListener(`click`, () => {
  document.querySelector("#mymodal_signUp").classList.add("is-active")

})

cancel_login.addEventListener(`click`, () => {
  document.querySelector("#mymodal_login").classList.remove("is-active")

})


login.addEventListener(`click`, () => {
  document.querySelector("#mymodal_login").classList.add("is-active")

})





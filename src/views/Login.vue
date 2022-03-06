<template>
  <br />
  <div style="text-align: center">
    <br />
    <h1>login</h1>
    <p>User Name : <input type="text" v-model="email" required /></p>
    <p>Password : <input type="text" required v-model="password" /></p>
    <br />
    <button @click="login()">Login</button> <br />
    <button @click="GoogleLogin()">Google Login</button>
    <br />
    email: {{ email }} <br />
    password: {{ password }} <br />
    user: {{ user }} <br />

    <button @click="logOut()">Sign Out</button>
  </div>
</template>>  

<script>
import { auth } from "../plugins/firebaseinit.js";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      user: {},
    };
  },

  methods: {
    logOut() {
      //const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          this.$router.replace("/");
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },

    GoogleLogin() {
      const provider = new GoogleAuthProvider();
      //const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken; //token คือรหัสที่ใช้เชื่อมต่อระหว่างระบบ ณ ขณะนั้น
          // The signed-in user info.
          const user = result.user;
          console.log("Google Token : " + token);
          console.log(user);
          this.user = user;
          this.$router.replace("/about");
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
          // The email of the user's account used.
          //const email = error.email;
          // The AuthCredential type that was used.
          //const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },
    login() {
      //const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User : " + user);
          this.$router.replace("/about");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
        });
    },
  },
};
</script>

<style></style>

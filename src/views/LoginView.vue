<template>
  <div>
    <h1>Login</h1>
    <p>User Name : <input type="email" required v-model="email" /></p>
    <p>Password : <input type="password" required v-model="password" /></p>
    <button></button>
  </div>
</template>

<script>
import { auth } from "../plugins/firebaseinit";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      //const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User = " + user);
          // ...
          this.$router.replace("/about");
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

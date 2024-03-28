<template>
  <div style="text-align: center">
    <h1 id="mainHead">CRYPTO_PAPER_PORTFOLIO</h1>
    <div>
      <input
        type="email"
        v-model="email"
        id="emailInput"
        placeholder="Enter your email"
      />
      <br />
      <br />
      <input
        type="password"
        v-model="password"
        id="passwordInput"
        placeholder="Enter your password"
      />
      <br />
      <br />
      <button id="btn" @click="signInWithEmail">Sign In with Email</button>
      <br /><br />
      <button id="btn" @click="signInWithGoogle">Sign In with Google</button>
      <br /><br />
    </div>
    <div id="pagecontent">
      Crypto Paper Portfolio (CPP) is an app to track your crypto portfolio.
      <br />
      Enter coin details and get real time Profit and Loss update of your
      Portfolio.
    </div>
    <h5>copyright@cpp-2024</h5>
  </div>
</template>

<script>
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default {
  name: "Login",

  data() {
    return {
      user: false,
      email: "", // Add this line
      password: "", // And this line
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },

  methods: {
    signInWithGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          console.error("Google sign-in error:", error);
        });
    },
    signInWithEmail() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((result) => {
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          console.error("Email sign-in error:", error);
        });
    },
  },
};
</script>

<style scoped>
#btn {
  text-align: center;
  margin: auto;
}

#pagecontent {
  height: 100px;
  font-size: larger;
  font-weight: bolder;
  text-align: center;
}

#mainHead {
  text-align: center;
  text-shadow: 2px 2px grey;
}

#bg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}

h5 {
  text-align: center;
  background-color: rgb(194, 202, 188);
}
</style>

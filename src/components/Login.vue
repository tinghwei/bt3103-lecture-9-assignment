<template>
  <div style="text-align: center">
    <h1 id="mainHead">CRYPTO_PAPER_PORTFOLIO</h1>
    <div id="firebaseui-auth-container"></div>
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
  EmailAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "Login",

  data() {
    return {
      user: false,
    };
  },

  mounted() {
    const auth = getAuth();
    var ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) ui = new firebaseui.auth.AuthUI(auth);
    const uiConfig = {
      signInSuccessUrl: "/home",
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
      ],
    };
    ui.start("#firebaseui-auth-container", uiConfig);
    onAuthStateChanged(auth, (user) => {
      if (user) this.user = user;
    });
  },
};
</script>

<style scoped>
#btn {
  text-align: center;
  margin: auto;
}

#pagecontent {
  padding-top: 50px;
  height: 100px;
  font-size: larger;
  font-weight: bolder;
  text-align: center;
}

#mainHead {
  background-color: #818cf8;
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

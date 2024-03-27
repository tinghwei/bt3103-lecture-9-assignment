<script>
import WelcomeCpp from "@/components/WelcomeCpp.vue";
import AddCoin from "@/components/AddCoin.vue";
import ProfitDisplay from "@/components/ProfitDisplay.vue";
import LogOut from "@/components/LogOut.vue";
import NavBar from "@/components/NavBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "App",
  components: {
    WelcomeCpp,
    AddCoin,
    ProfitDisplay,
    LogOut,
    NavBar, 
  },
  data() {
    return {
      refreshComp: 0,
      user: false,
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
    change() {
      this.refreshComp += 1;
    },
  },
};
</script>

<template>
  <div style="text-align: center" v-if="user">
    <NavBar/>
    <h3>This is the Home page</h3>
    <WelcomeCpp />
    <AddCoin @added="change" />
    <ProfitDisplay :key="refreshComp" />
    <LogOut />
    <br /><br />
  </div>
</template>

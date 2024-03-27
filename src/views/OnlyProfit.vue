<script>
import LogOut from "@/components/LogOut.vue";
import NavBar from "@/components/NavBar.vue";
import ProfitDisplay from "@/components/ProfitDisplay.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "OnlyProfit",
  components: {
    ProfitDisplay,
    NavBar,
    LogOut,
  },
  data() {
    return {
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
};
</script>

<template>
  <div style="text-align: center" v-if="user">
    <NavBar />
    <h3>This is the Profit Page</h3>
    <ProfitDisplay />
    <LogOut />
  </div>
</template>

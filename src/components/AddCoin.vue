<template>
  <div class="container">
    <form id="myform">
      <h2>Add Coins</h2>

      <div class="formli">
        <label for="coin1">Coin Name: </label>
        <input
          type="text"
          id="coin1"
          required=""
          placeholder="Enter your coin"
        />
        <br /><br />
        <label for="ticker1">Ticker: </label>
        <input
          type="text"
          id="ticker1"
          required=""
          placeholder="Valid (eg. BTC/USDT)"
        />
        <br /><br />
        <label for="buy1">Buy Price: </label>
        <input
          type="number"
          id="buy1"
          required=""
          placeholder="Enter the price"
        /><br /><br />
        <label for="quant1">Buy Quantity: </label>
        <input
          type="number"
          id="quant1"
          required=""
          placeholder="Enter the quantity"
        /><br /><br />
        <div class="save">
          <button id="savebutton" type="button" v-on:click="savetofs">
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import firebaseApp from "../firebase";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      useremail: "",
    };
  },
  async mounted() {
    const auth = getAuth();
    this.useremail = auth.currentUser.email;
  },

  methods: {
    async savetofs() {
      console.log("IN AC");

      let coin = document.getElementById("coin1").value;
      let ticker = document.getElementById("ticker1").value;
      let buyPrice = document.getElementById("buy1").value;
      let buyQuantity = document.getElementById("quant1").value;

      alert("Saving your data for Coin : " + coin);

      try {
        const docRef = await setDoc(doc(db, String(this.useremail), coin), {
          Coin: coin,
          Ticker: ticker,
          Buy_Price: buyPrice,
          Buy_Quantity: buyQuantity,
        });
        console.log(docRef);
        document.getElementById("myform").reset();
        this.$emit("added");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
  },
};
</script>

<style scoped>
h2 {
  background-color: #818cf8;
}

.formli {
  display: inline-block;
  text-align: right;
}

form {
  text-align: center;
  align-items: center;
  margin: autp;
}

input:hover {
  box-shadow: 2px 2px #6366f1;
  border-radius: 2px;
}

.save {
  text-align: center;
}
</style>

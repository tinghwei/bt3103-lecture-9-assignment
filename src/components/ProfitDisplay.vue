<template>
  <h1 id="Current">Current portfolio</h1>

  <table id="table" class="auto-index">
    <tr>
      <th>S.No</th>
      <th>Coin</th>
      <th>Ticker</th>
      <th>Buy_Price</th>
      <th>Buy_Quantity</th>
      <th>Current_Price</th>
      <th>Profit</th>
      <th>Options</th>
    </tr>
    <tr v-for="(row, index) in tableRows" :key="row.coin">
      <td>{{ index + 1 }}</td>
      <td>{{ row.coin }}</td>
      <td>{{ row.ticker }}</td>
      <td>{{ row.buyPrice }}</td>
      <td>{{ row.buyQuantity }}</td>
      <td>{{ row.currentPrice }}</td>
      <td>{{ row.profit }}</td>
      <td>
        <button @click="deleteInstrument(row.coin, useremail)" class="bwt">
          Delete
        </button>
      </td>
    </tr>
  </table>
  <br /><br />

  <h2 id="totalProfit">Your Total Profit is: ${{ totalProfit }}</h2>
</template>

<script>
import firebaseApp from "../firebase";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import ccxt from "ccxt";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      useremail: "",
      tableRows: [],
      totalProfit: 0,
    };
  },
  async mounted() {
    const auth = getAuth();
    this.useremail = auth.currentUser.email;
    await this.fetchAndUpdateData(this.useremail);
  },

  methods: {
    async fetchAndUpdateData(useremail) {
      try {
        const querySnapshot = await getDocs(collection(db, String(useremail)));
        for (const doc of querySnapshot.docs) {
          const data = doc.data();
          const { Coin, Ticker, Buy_Price, Buy_Quantity } = data;
          try {
            const binance = new ccxt.binance();
            const x = await binance.fetch_ohlcv(Ticker, "5m");
            const currentPrice = x[499][4];
            const profit = Math.round(
              Buy_Quantity * (parseFloat(currentPrice) - parseFloat(Buy_Price))
            );
            this.tableRows.push({
              coin: Coin,
              ticker: Ticker,
              buyPrice: Buy_Price,
              buyQuantity: Buy_Quantity,
              currentPrice: currentPrice,
              profit: profit,
            });
            this.totalProfit += profit;
          } catch (error) {
            console.error("Error calculating profit: ", error);
          }
        }
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    },
    async deleteInstrument(coin) {
      try {
        alert("You are going to delete " + coin);
        await deleteDoc(doc(db, String(this.useremail), coin));
        console.log("Document successfully deleted!", coin);
        this.fetchAndUpdateData(this.useremail); // Update table after deletion
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    },
  },
};
</script>

<style>
h1,
h2 {
  text-align: center;
  background-color: #818cf8;
  font: 700;
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

tr:nth-child(even) {
  background-color: #e3edee;
}

th,
td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

.bwt {
  color: rgb(243, 236, 236);
  background-color: #6366f1;
}
</style>

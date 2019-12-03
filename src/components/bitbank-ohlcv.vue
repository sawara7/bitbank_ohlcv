<template>
  <v-container>
    <v-alert :value="showAlert" :type="alertType">{{ message }}</v-alert>
    <v-layout text-center wrap>
      <v-flex xs12>
        Bitbank ohlcv
        <v-combobox
          v-model="selectedPair"
          :items="pairs"
          label="Select a pair."
        ></v-combobox>
        <v-combobox
          v-model="selectedCandleType"
          :items="candleType"
          label="Select a candleType."
        ></v-combobox>
        <v-date-picker
          v-model="selectedDates"
          range
          no-title
        >
        </v-date-picker>
        <br><br>
        <v-btn @click="download(selectedPair, selectedCandleType, selectedDates)"> Download </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const bb = require("./bitbank");
const stringify = require("csv-stringify/lib/sync");
export default {
  name: 'bitbank-ohlcv',
  data: () => ({
    pairs              : bb.PAIRS,
    candleType         : bb.CANDLETYPE,
    selectedPair       : bb.PAIRS[0],
    selectedCandleType : bb.CANDLETYPE[0],
    selectedDates      : [],
    showAlert          : false,
    alertType          : "info",
    message            : "message"
  }),
  methods: {
    async download(pair, candleType, dates) {
      let res = [];
      let msg = "Empty data.";
      try{
        res = await bb.GetOHLCV(pair, candleType, dates);
      }catch(error){
        msg = error;
      }
      if (res.length === 0){
        this.showAlert = true;
        this.alertType = "error";
        this.message = msg;
      }else{                
        let output = stringify(res);
        let blob = new Blob([output], { type: 'text/csv' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = pair + '_' + candleType + '_' + dates[0] + '.csv'
        link.click()
        this.showAlert = true;
        this.alertType = "success";
        this.message = "Completed.";
      }
    }
  }
};
</script>

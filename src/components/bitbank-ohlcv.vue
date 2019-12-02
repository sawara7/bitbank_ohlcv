<template>
  <v-container>
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
    selectedDates      : []
  }),
  methods: {
    download :async (pair, candleType, dates) => {
      let res = await bb.GetOHLCV(pair, candleType, dates);
      let output = stringify(res);
      let blob = new Blob([output], { type: 'text/csv' })
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Result.csv'
      link.click()
    }
  }
};
</script>

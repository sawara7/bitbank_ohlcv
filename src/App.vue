<template>
  <v-app>
    <v-flex xs2 align-self-center>
      <BitbankOHLCV/>
    </v-flex>
  </v-app>
</template>

<script>
import BitbankOHLCV from './components/bitbank-ohlcv.vue';

export default {
  name: 'App',

  components: {
    BitbankOHLCV,
  },

  data: () => ({
    //
  }),
};
</script>

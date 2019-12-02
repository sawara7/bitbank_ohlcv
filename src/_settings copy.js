// BITBANK
const URL_BB_PUBLIC = 'https://public.bitbank.cc';
const URL_BB_PRIVATE = 'https://api.bitbank.cc/v1';
const ACCOUNT_BB = 'xxx';
const APIKEY_BB = 'yyy';

// AVERAGING LOGIC
const TARGET_PAIR = 'btc_jpy';
const INTERVAL = 1000 * 60;
const INTERVAL_AMOUNT = 0.0001;
const INTERVAL_PROFIT_RATE = 0.001;

module.exports = {
    URL_BB_PUBLIC,
    URL_BB_PRIVATE,
    ACCOUNT_BB,
    APIKEY_BB,
    TARGET_PAIR,
    INTERVAL,
    INTERVAL_AMOUNT,
    INTERVAL_PROFIT_RATE
}
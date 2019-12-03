const bitbank = require('node-bitbankcc');

const PAIRS = ["btc_jpy", "xrp_jpy", "ltc_btc", "eth_btc", "mona_jpy", "mona_btc", "bcc_jpy", "bcc_btc"];

const CANDLETYPE = ["1min", "5min", "15min", "30min", "1hour", "4hour", "8hour", "12hour", "1day", "1week"];

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

const publicApi =new bitbank.PublicApi({
    'endPoint' : 'https://public.bitbank.cc',
    'keepAlive': false,
    'timeout'  : 60000,
});

const GetOHLCV = async(pair, candleType, dates) => {
    let dt = new Date(dates[0]);
    let end;
    if (dates.length > 1){
        end = new Date(dates[1]);
    }else{
        end = new Date(dates[0]);
    }
    let data = [];

    while (dt <= end){
        let d = 
            dt.getFullYear().toString() + 
            ("00" + (dt.getMonth()+1)).slice(-2) + 
            ("00" + dt.getDate()).slice(-2);
        let res = await publicApi.getCandlestick({
            pair : pair,
            candleType : candleType,
            yyyymmdd : d
        });
        data = data.concat(res.data.candlestick[0].ohlcv);
        dt.setDate(dt.getDate() + 1);
        await sleep(1000);
    }
    return data;
}

module.exports = {
    PAIRS,
    CANDLETYPE,
    GetOHLCV
}


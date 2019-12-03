const bitbank = require("./src/components/bitbank");

(async () =>{
    let res;
    try{
        res = await bitbank.GetOHLCV("btc_jpy","1min",["aaa-12-01","2019-12-02"]);
    }catch(error){
        console.log(error);
    }
    console.log(res);
})()

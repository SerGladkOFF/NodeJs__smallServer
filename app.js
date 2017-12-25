const http = require("http")
const fs = require("fs")
const Events = require('events')
const eventEmitter = new Events()

const TIME = +process.env.TIME||10000
const INTERVAL = +process.env.INTERVAL||200

eventEmitter.on("startInterval",(resp)=>{
    const interval=setInterval(()=>{   
        let date = new Date().toUTCString();
        resp.write(date+'\n')
        console.log(date)
    },INTERVAL)
})

http.createServer((req,resp)=>{

    const interval = eventEmitter.emit("startInterval",resp)

    setTimeout(()=>{
        clearInterval(interval)
        resp.end()
        process.exit(1)
    },TIME)

}).listen(3000)




const fs = require("fs");
const fastify = require("fastify")();

const {coinCount} = require("./p3-module.js");


fastify.get("/coins", (request, reply) => {
    const { option } = request.query;
    let coins = [
        { denom: 25, count: 2 },
        { denom: 1, count: 7 },
    ];
    let coinValue = 0;

    switch (option) {
        case "1":
            coinValue = coinCount({denom: 5, count: 3}, {denom: 10, count: 2 });
            break;
        case "2":
            coinValue = coinCount(...coins);
            break;
        case "3":
            coinValue = coinCount(coins);
            break;
         default:
            coinValue = 0;
            break;
    }
    reply
        .code(200)
        .header("Content-Type", "text/html")
        .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
});

fastify.get("/coin", (request, reply) =>{
    const {denom = 0, count = 0} = request.query;

    const denomInt = parseInt(denom);
    const countInt = parseInt(count);

    const coinValue = coinCount(countInt, denomInt);
    reply
        .code(200)
        .header("Content-Type", "text/html")
        .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);

});

fastify.get("/", (request, reply) => {
fs.readFile(`${__dirname}/index.html`, (err,data) => {
    if (err) {
        console.log(err);
        reply.code(500);
    } else {
      reply
        .code(200)
        .header("Content-Type", "text/html")
        .send(data);
     }
    });
});


  // Start server and listen to requests using Fastify
  const listenIP = "localhost";
  const listenPort = 8080;
  fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);

    
  });

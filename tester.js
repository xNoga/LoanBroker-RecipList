let amqp = require('amqplib/callback_api');

let args = 
{
    ssn: 2310772323,
    creditScore: 700,
    loanAmount: 300000,
    loanDuration: 36,
    queues: ["ckkm-PremiumBank", "ligemeget"]
};

amqp.connect('amqp://datdb.cphbusiness.dk', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q = 'ckkm-recip-test';
        let msg = JSON.stringify(args);

        ch.assertQueue(q, {durable: false});

        ch.sendToQueue(q, new Buffer(msg));
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
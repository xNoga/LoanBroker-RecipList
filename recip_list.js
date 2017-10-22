"use strict";
var amqp = require('amqplib/callback_api');
var url = 'http://localhost:8001/wsdl?wsdl';

amqp.connect('amqp://datdb.cphbusiness.dk', function (err, conn) {
    conn.createChannel(function (err, ch) {
        let q = 'ckkm-recip-test'

        ch.assertQueue(q, {durable: false});
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            let args = JSON.parse(msg.content.toString());   
            args.queues.forEach(function(element) {
                ch.sendToQueue(element, new Buffer(JSON.stringify(args)))
            });
        }, {noAck: true});
    });
});
const mqtt = require('mqtt');
const host = 'ws://localhost:9000'
const clientId = 'APIRaspi'
const options = {clientId}

const mqttHandler = mqtt.connect(host, options);

mqttHandler.subscribe('temperatura/guardar');
mqttHandler.subscribe('spo2/guardar');
mqttHandler.subscribe('cardiaco/guardar');
mqttHandler.subscribe('air/guardar');
mqttHandler.subscribe('ambiente/guardar');
mqttHandler.subscribe('humedad/guardar');
mqttHandler.subscribe('touch/alert');

mqttHandler.on('message', (topic, message) => {
    fetch("http://localhost:3000/"+topic, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: message,
      })
});

module.exports = mqttHandler
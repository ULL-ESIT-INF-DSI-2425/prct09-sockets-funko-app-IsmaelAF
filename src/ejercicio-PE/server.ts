import net from 'net';
import chalk from 'chalk';
import { ClientRequest } from 'http';
import {EventEmitter} from 'events';

export class MessageEventEmitter extends EventEmitter {
    /**
     * constructor de MessageEventEmitter, maneja los datos
     * recibidos y emite evento 'request' cuando reciba una solicitud completa.
     * @param connection - socket
     */
    constructor(connection: EventEmitter) {
        super();

        let wholeData = '';
        connection.on('data', (dataChunk) => {
            wholeData += dataChunk;

            let messageLimit = wholeData.indexOf('\n');
            while (messageLimit !== -1) {
                const message = wholeData.substring(0, messageLimit);
                wholeData = wholeData.substring(messageLimit + 1);
                this.emit('request', message);
                messageLimit = wholeData.indexOf('\n');
            }
        });
    }
}


let clients: net.Socket[] = [];

const server = net.createServer((connection) => {
    const emitter = new MessageEventEmitter(connection);
    
    console.log("Un cliente se ha conectado.");
    clients.push(connection);
 
    emitter.on('request', (data) => {
        const request: string = data.toString();
        console.log("Enviando Mensaje....");
        //console.log(request);
        let response: string;

        response = request;
        
        clients.forEach(element => {
            if (element !== connection) {
                element.write("mensaje: " + response + '\n');
            }
        });
    });

});

server.listen(60300, () => {
    console.log("Esperando por clientes para conectarse.");
});
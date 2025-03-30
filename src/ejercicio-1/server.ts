import net from 'net';
import { RequestType } from './RequestType.js';
import { ResponseType } from './ResponseType.js';
import { Funko } from './Funko.js';
import { FunkoManager } from './FunkoManager.js';
import chalk from 'chalk';

const server = net.createServer({allowHalfOpen: true},(connection) => {
    console.log("Un cliente se ha conectado.");
    //console.log(connection);

    let requestData = '';
    connection.on('data', (chunk) => {
        requestData += chunk.toString();
    });

    


    connection.on('end', () => {
        const request: RequestType = JSON.parse(requestData.toString());
        const manager = new FunkoManager(request.user);
        let response: ResponseType;

        switch (request.type) {
            case 'add':
                let bol: boolean = manager.addFunko(request.funkoPop!);

                if(bol === false) {
                    response = {type: 'add', success: false};
                } else if(bol === true) {
                    response = {type: 'add', success: true};
                } else {
                    response = {type: 'add', success: false};
                }
                

                break;
            case 'list':
                //let mes = manager.listarFunkos();
                let mes = manager.listarFunkos();
                if (mes === true || mes === false) {
                    response = {type: 'list', success: false};
                } else {
                    response = {type: 'list', success: true, funkoPops: mes};
                }
                //response = {type: 'list', success: true, funkoPops: mes}
                break;
            case 'read':
                let mesg = manager.mostrarFunko(request.id!);
                if (mesg === true || mesg === false) {
                    response = {type: 'read', success: false};
                } else {
                    response = {type: 'read', success: true, funkoPops: mesg};
                }
                break;
            case 'update':
                let messag = manager.actualizarFunko(request.funkoPop!);
                if(messag === false) {
                    response = {type: 'update', success: false};
                } else if (messag === true) {
                    response = {type: 'update', success: true};
                } else {
                    response = {type: 'update', success: false};
                }

                break;
            case 'remove':
                let mess = manager.eliminarFunko(request.id!);
                
               response = {type: 'remove', success: mess};
                break;
            default:
                response = {type: request.type, success:false};
                break;
        }
        connection.write(JSON.stringify(response));
        connection.end();
    })
});

server.listen(60300, () => {
    console.log("Esperando por clientes para conectarse.");
});
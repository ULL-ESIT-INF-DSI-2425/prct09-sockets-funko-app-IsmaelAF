import net from 'net';
import chalk from "chalk";

import yargs from "yargs";
import {hideBin} from "yargs/helpers"
import { Funko } from "./Funko.js";
import { FunkoGenero } from "./enums/FunkoGenero.js";
import { FunkoTipo } from "./enums/FunkoTipo.js";
import { FunkoManager } from "./FunkoManager.js";
import { RequestType } from './RequestType.js';
import { ResponseType } from './ResponseType.js';

/**
 * Envía solicitud a server
 * @param request - tipo de solicitud
 */
const sendRequest = (request: RequestType) => {
    
    const client = net.createConnection({port: 60300}, () => {
        client.write(JSON.stringify(request));
        client.end();
    });


    let wholeData = '';
    client.on('data', (dataChunk) => {
        wholeData += dataChunk;
    });


    client.on('end', () => {
        const response: ResponseType = JSON.parse(wholeData.toString());
        console.log(response);
        if (response.success) {
            switch (response.type) {
                case 'add':
                    console.log(chalk.green("Funko agregado correctamente."));
                    break;
                case 'read':
                    console.log(chalk.green("Funko encontrado: "));
                    break;
                case 'list':
                    console.log(chalk.green("Lista del usuario: "));
                    break;
                case 'update':
                    console.log(chalk.green("Funko actualizado correctamente."));
                    break;
                case 'remove':
                    console.log(chalk.green("Funko eliminado correctamente."));
                    break;
                default:
                    break;
            }
            
            if (response.funkoPops && response.funkoPops?.length > 0) {
                response.funkoPops.forEach(funko => {
                    console.log(chalk.yellow(
                        `ID: ${funko.id}
Nombre: ${funko.nombre}
Descripcion: ${funko.descripcion}
Tipo: ${funko.tipo}
Genero: ${funko.genero}
Franquicia: ${funko.Franquicia}
Numero: ${funko.numero}
Exclusiovo: ${funko.exclusivo}
Caracteristicas: ${funko.caracteristicas}
Valor: ${funko.valor}
------------------`));
                });
            }

        } else {

            
            switch (response.type) {
                case 'read':
                    console.log(chalk.red("No se encontraron Funkos."));
                    break;
                case 'add':
                    console.log(chalk.red("NO se agregó el Funko."));
                    break;
                case 'list':
                    console.log(chalk.red("Error al mostrar la lista de Funkos."));
                    break;
                case 'update':
                    console.log(chalk.red("Error al actualizar el Funko."));
                    break;
                case 'remove':
                    console.log(chalk.red("Error al eliminar el Funko."));
                    break;
                default:
                    break;
            }
        }
        client.end();
    });

}


const argv = yargs(hideBin(process.argv))
    .command('add', 'Agrega un Funko', {
        user: { type: "string", demandOption: true },
        id: { type: "number", demandOption: true },
        name: { type: "string", demandOption: true },
        desc: { type: "string", demandOption: true },
        type: { type: "string", choices: Object.values(FunkoTipo), demandOption: true },
        genre: { type: "string", choices: Object.values(FunkoGenero), demandOption: true },
        franq: { type: "string", demandOption: true },
        numero: { type: "number", demandOption: true },
        exclu: { type: "boolean", demandOption: true },
        carac: { type: "string", demandOption: true },
        valor: { type: "number", demandOption: true }
    }, (args) => {
        const manager = new FunkoManager(args.user);
        const newFunko = new Funko(
            args.id,
            args.name,
            args.desc,
            args.type as FunkoTipo,
            args.genre as FunkoGenero,
            args.franq,
            args.numero,
            args.exclu,
            args.carac,
            args.valor
        );
        //console.log(newFunko);
        const request : RequestType = {
            type: "add", 
            user: args.user,
            funkoPop: newFunko,
        };
        sendRequest(request);
        
    })
    .command("list", "Listar Funkos", {
        user: {type: "string", demandOption: true }
    }, (args) => {
        const request : RequestType = {
            type: "list", 
            user: args.user,
        };
        sendRequest(request);
        //const manager = new FunkoManager(args.user);
        //manager.listarFunkos();
    })
    .command("update", "Modificar un Funko", {
        user: { type: "string", demandOption: true },
        id: { type: "number", demandOption: true },
        name: { type: "string", demandOption: true },
        desc: { type: "string", demandOption: true },
        type: { type: "string", choices: Object.values(FunkoTipo), demandOption: true },
        genre: { type: "string", choices: Object.values(FunkoGenero), demandOption: true },
        franq: { type: "string", demandOption: true },
        numero: { type: "number", demandOption: true },
        exclu: { type: "boolean", demandOption: true },
        carac: { type: "string", demandOption: true },
        valor: { type: "number", demandOption: true }
    }, (argv) => {
        //const manager = new FunkoManager(argv.useru);
        const updateFunko = new Funko(
            argv.id,
            argv.name,
            argv.desc,
            argv.type as FunkoTipo,
            argv.genre as FunkoGenero,
            argv.franq,
            argv.numero,
            argv.exclu,
            argv.carac,
            argv.valor
        );
        const request : RequestType = {
            type: "update", 
            user: argv.user,
            funkoPop: updateFunko,
        };
        sendRequest(request);
        //manager.actualizarFunko(updateFunko);
    })
    .command("remove", "Elimina un Funko", {
        user: { type: "string", demandOption: true },
        id: { type: "number", demandOption: true }
    }, (argv) => {
        const request : RequestType = {
            type: "remove", 
            user: argv.user,
            id: argv.id,
        };
        sendRequest(request);
        //const manager = new FunkoManager(argv.user);
        //manager.eliminarFunko(argv.id);
    })
    .command("read", "Muestra la informacion de un Funko", {
        user: { type: "string", demandOption: true },
        id: { type: "number", demandOption: true }
    }, (argv) => {
        const request : RequestType = {
            type: "read", 
            user: argv.user,
            id: argv.id,
        };
        sendRequest(request);
        //const manager = new FunkoManager(argv.user);
        //manager.mostrarFunko(argv.id);
    })
    .help()
    .argv;
    
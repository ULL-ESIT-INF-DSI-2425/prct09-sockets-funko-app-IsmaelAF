import net from 'net';
import chalk from "chalk";

import yargs from "yargs";
import {hideBin} from "yargs/helpers"
import Stream from 'stream';
import { rawListeners } from 'process';


    
    const client = net.createConnection({port: 60300}, () => {

        
        process.stdin.on("data", data => {
            let datar = data.toString();
            //process.stdout.write(datar + "\n");
            client.write(datar);
        });
        
    });

    let wholeData = '';
    client.on('data', (dataChunk) => {
        wholeData += dataChunk.toString();
        if (wholeData.endsWith('\n')) {
            const response = wholeData.toString();
            console.log(response);
        }
        /*if (response.success) {
            
            

        } else {

            
            
        }*/
        //client.end();
    });




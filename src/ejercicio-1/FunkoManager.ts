import fs from "fs";
import { Funko } from "./Funko.js";
import chalk from "chalk";
import path from "path";
import { FunkoTipo } from "./enums/FunkoTipo.js";
import { FunkoGenero } from "./enums/FunkoGenero.js";
import { callbackify } from "util";

export class FunkoManager {
    private basePath = "data/";

    /**
     * Constructro de la clase FunkoManager
     * @param user - usuario que manejará la coleccion de Funkos
     */
    constructor(private user: string) {
        if (!fs.existsSync(this.getUserPath())) {
            fs.mkdirSync(this.getUserPath(), {recursive: true});
        }
    }

    /**
     * Funcion que devuelve la direccion del usuario
     * @returns - dir del usuario
     */
    private getUserPath(): string {
        return path.join(this.basePath, this.user);
    }

    /**
     * Funcion que devuelve la direccion del fichero json de un Funko por su ID
     * @param id - id del funko a buscar
     * @returns - direccion del fichero json de un Funko
     */
    private getFunkoIdPath(id: number): string {
        return path.join(this.getUserPath(), `${id}.json`);
    }

    /**
     * Funcion que devuelve la direccion del fichero json de un funko
     * @param funko - funko a buscar
     * @returns - direccion del fichero json de un Funko
     */
    private getFunkoPath(funko: Funko): string {
        return path.join(this.getUserPath(), `${funko.id}.json`);
    }

    /**
     * Funcion para agregar un Funko a la coleccion
     * @param funko - funko a agregar
     * @returns - undefined si ya existe el funko
     */
    public addFunko(funko: Funko): boolean{
        /*if (!fs.existsSync(this.getUserPath())) {
            fs.mkdirSync(this.getUserPath(), {recursive: true });
        }*/

        if (fs.existsSync(this.getFunkoIdPath(funko.id))) {
            //console.log(chalk.red("Funko ya existe."));
            return false;
        }

        fs.writeFileSync(this.getFunkoIdPath(funko.id), JSON.stringify(funko, null, 2));
        //console.log(chalk.green("Funko añadido correctamente."));
        return true;
    }

    /**
     * Funcion que actualiza un Funko de la coleccion
     * @param funko - Funko actualizado
     * @returns - undefined si no encuentra el funko a actualizar
     */
    public actualizarFunko(funko: Funko): boolean {
        if (!fs.existsSync(this.getFunkoPath(funko))) {
            //console.log(chalk.red("Funko no encontrado."));
            return false;
        }

        fs.writeFileSync(this.getFunkoIdPath(funko.id), JSON.stringify(funko, null, 2));
        //console.log(chalk.green("Funko modificado correctamente."));
        return true;
    }


    /**
     * Funcion para eliminar un funko de la coleccion
     * @param id - id del funko a eliminar
     * @returns - undefined si no se encuentra el funko a eliminar
     */
    public eliminarFunko(id: number): boolean {
        if (!fs.existsSync(this.getFunkoIdPath(id))) {
            //console.log(chalk.red("No se encontro el Funko a eliminar."));
            return false;
        }

        fs.unlinkSync(this.getFunkoIdPath(id));
        //console.log(chalk.green("Funko eliminado."));
        return true;
    }

    /**
     * Funcion que lee un Funko de la coleccion
     * @param id - id del funko a leer
     * @returns - atributos del funko o undefined si no se encuentra el funko a leer
     */
    public mostrarFunko(id:number): Funko[] | boolean {
        if (!fs.existsSync(this.getFunkoIdPath(id))) {
            console.log(chalk.red("No se encontro el Funko a leer."));
            return false;
        }
        //let result: Funko;
        let result: Funko[] = [];

        const funkoData = JSON.parse(fs.readFileSync(this.getFunkoIdPath(id), "utf-8"));
        const funko = new Funko(
            funkoData.id,
            funkoData.nombre,
            funkoData.descripcion,
            funkoData.tipo,
            funkoData.genero,
            funkoData.Franquicia,
            funkoData.numero,
            funkoData.exclusivo,
            funkoData.caracteristicas,
            funkoData.valor
        );
        result.push(funko);
        return result;
    }

    /**
     * Funcion para listar todos los funkos de una coleccion
     * @returns - todos los atributos de todos los Funkos en una coleccion o undefined si no se encuentra ningun Funko.
     */
    public listarFunkos(): Funko[] | boolean{
        /*
        if (!fs.existsSync(this.getUserPath())) {
            console.log(chalk.red("No se encontro la carpeta del usuario."));
            return undefined;
        }*/

        const files = fs.readdirSync(this.getUserPath());
        if (files.length === 0) {
            console.log(chalk.red("No se encontraron Funkos."));
            return false;
        }

        console.log(chalk.blue(`Coleccion de Funkos de: ${this.user}`));
        let resultado: string = '';
        let resul: Funko[] = [];
        files.forEach(file => {
            
            const funkoData = JSON.parse(fs.readFileSync(path.join(this.getUserPath(), file), "utf-8"));
            const funko = new Funko(
                funkoData.id,
                funkoData.nombre,
                funkoData.descripcion,
                funkoData.tipo,
                funkoData.genero,
                funkoData.Franquicia,
                funkoData.numero,
                funkoData.exclusivo,
                funkoData.caracteristicas,
                funkoData.valor
            );
            resul.push(funko);
            /*resultado += 
chalk.yellow(
                `----------------
ID: ${funko.id}
Nombre: ${funko.nombre}
Descripcion: ${funko.descripcion}
Tipo: ${funko.tipo}
Genero: ${funko.genero}
Franquicia: ${funko.Franquicia}
Numero: ${funko.numero}
Exclusiovo: ${funko.exclusivo}
Caracteristicas: ${funko.caracteristicas}
Valor: ${funko.valor}`
);*/
        });
        return resul;
    }

    /**
     * Funcion para determinar el color del valor de mercado por valores
     * @param valor - valor del mercado
     * @returns valor del mercado con el estilo correspondiente
     */
    /*private rangoValores(valor: number): string {
        if (valor > 100) return chalk.green(valor.toString());
        if (valor > 50) return chalk.blue(valor.toString());
        if (valor > 20) return chalk.bgWhite(valor.toString());
        if (valor > 2) return chalk.red(valor.toString());
        return chalk.red(valor.toString());
    }*/

}

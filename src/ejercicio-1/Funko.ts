import { FunkoGenero } from "./enums/FunkoGenero.js";
import { FunkoTipo } from "./enums/FunkoTipo.js";

/**
 * Clase Funko
 */
export class Funko {
    /**
     * Constructor para la clase Funko
     * @param id - id unico
     * @param nombre - nombre Funko
     * @param descripcion - descripcion Funko
     * @param tipo - Tipo Funko, usando enum
     * @param genero - Genero Funko, usando enum
     * @param Franquicia - Franquicia Funko
     * @param numero - numero Funko en la franquicia
     * @param exclusivo - Funko exclusivo
     * @param caracteristicas - caracteristicas Funko
     * @param valor - valor Funko, mayor a 0
     */
    constructor(
        public id: number,
        public nombre: string, 
        public descripcion: string,
        public tipo: FunkoTipo,
        public genero: FunkoGenero,
        public Franquicia: string,
        public numero: number,
        public exclusivo: boolean,
        public caracteristicas: string,
        public valor: number
    ) {
        if (valor < 0) {
            throw new Error("Valor de mercado debe ser positivo.");
        }
    }
}
import { describe, expect, test, vi } from "vitest";

import fs from "fs";
import path from "path";

import {Funko} from "../../src/ejercicio-1/Funko"
import { FunkoGenero } from "../../src/ejercicio-1/enums/FunkoGenero";
import { FunkoTipo } from "../../src/ejercicio-1/enums/FunkoTipo";
import {FunkoManager} from "../../src/ejercicio-1/FunkoManager"


const consoleSpy = vi.spyOn(console, 'log');

describe("Tests Funko", () => {
    
    test("Clase funko", () => {

        let funkoTest = new Funko(
            2,
            "nombre2",
            "desc",
            "Pop!" as FunkoTipo,
            "Videojuegos" as FunkoGenero,
            "franquicia1",
            1,
            false,
            "none",
            25
        );
        expect(funkoTest.id).toBe(2);
        expect(funkoTest.nombre).toBe("nombre2");
        expect(funkoTest.descripcion).toBe("desc");
        expect(funkoTest.tipo).toBe(FunkoTipo.POP);
        expect(funkoTest.genero).toBe(FunkoGenero.VIDEOJUEGOS);
        expect(funkoTest.Franquicia).toBe("franquicia1");
        expect(funkoTest.numero).toBe(1);
        expect(funkoTest.exclusivo).toBe(false);
        expect(funkoTest.caracteristicas).toBe("none");
        expect(funkoTest.valor).toBe(25);
    });

    test("Clase funko error Valor de mercado", () => {

        
        expect(() => {let funkoTest = new Funko(
            2,
            "nombre2",
            "desc",
            "Pop!" as FunkoTipo,
            "Videojuegos" as FunkoGenero,
            "franquicia1",
            1,
            false,
            "none",
            -2
        );}).toThrowError(/Valor de mercado debe ser positivo./);
    });
  });
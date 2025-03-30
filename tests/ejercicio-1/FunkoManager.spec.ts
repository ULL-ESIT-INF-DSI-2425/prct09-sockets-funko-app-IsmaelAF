import { describe, expect, test, vi } from "vitest";

import fs from "fs";
import path from "path";

import {Funko} from "../../src/ejercicio-1/Funko"
import { FunkoGenero } from "../../src/ejercicio-1/enums/FunkoGenero";
import { FunkoTipo } from "../../src/ejercicio-1/enums/FunkoTipo";
import {FunkoManager} from "../../src/ejercicio-1/FunkoManager"
import { afterEach, beforeEach } from "node:test";

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

let funkoTest2 = new Funko(
    2,
    "nombre2",
    "desc",
    "Pop!" as FunkoTipo,
    "Videojuegos" as FunkoGenero,
    "franquicia1",
    1,
    false,
    "none",
    0
);

let funkoTest3 = new Funko(
    2,
    "nombre2",
    "desc",
    "Pop!" as FunkoTipo,
    "Videojuegos" as FunkoGenero,
    "franquicia1",
    1,
    false,
    "none",
    10
);

let funkoTest4 = new Funko(
    2,
    "nombre2",
    "desc",
    "Pop!" as FunkoTipo,
    "Videojuegos" as FunkoGenero,
    "franquicia1",
    1,
    false,
    "none",
    200
);

let funkoTest5 = new Funko(
    2,
    "nombre2",
    "desc",
    "Pop!" as FunkoTipo,
    "Videojuegos" as FunkoGenero,
    "franquicia1",
    1,
    false,
    "none",
    60
);



function borrarDir(): void {
    if (fs.existsSync("data/usuarioTests")) {
        const files = fs.readdirSync("data/usuarioTests");
        files.forEach(file => {
            fs.unlinkSync(path.join("data/usuarioTests", file));
        });
    }
}

const consoleSpy = vi.spyOn(console, 'log');

describe("Tests FunkoManager", () => {
    
    //afterEach(() => {
    //     fs.rmSync(`data/usuarioTests}`, { recursive: true });
    //});


    test("Agregar funko", () => {
        borrarDir();
        if(fs.existsSync("data/usuarioTests")) {
            fs.rmdirSync("data/usuarioTests");
        }
        //fs.rmdirSync("data/usuarioTests");
        let manager = new FunkoManager("usuarioTests");
        manager.addFunko(funkoTest);

        expect(consoleSpy).toHaveBeenCalledWith("Funko añadido correctamente.");
    });

    test("Agregar funco existente funko", () => {
        let manager = new FunkoManager("usuarioTests");
        manager.addFunko(funkoTest);

        expect(consoleSpy).toHaveBeenCalledWith("Funko ya existe.");
        
    });

    test("Lista de funcos", () => {
        let manager = new FunkoManager("usuarioTests");
        const resultado = manager.listarFunkos();

        expect(resultado).toBe(undefined);
        
    });

    test("Leer", () => {
        let manager = new FunkoManager("usuarioTests");
        const resultado = manager.mostrarFunko(2);

        expect(resultado).toBe(undefined);

        const resultado2 = manager.mostrarFunko(3);

        expect(resultado2).toBe(undefined);
        
    });

    test("Actualizar", () => {
        let manager = new FunkoManager("usuarioTests");
        let funkoTest = new Funko(
            2,
            "nombre3",
            "desc",
            "Pop!" as FunkoTipo,
            "Videojuegos" as FunkoGenero,
            "franquicia1",
            1,
            false,
            "none",
            25
        );

        const resultado = manager.actualizarFunko(funkoTest);

        expect(resultado).toBe(undefined);
        
    });

    test("Actualizar no encontrado", () => {
        let manager = new FunkoManager("usuarioTests");
        let funkoTest = new Funko(
            99,
            "nombre3",
            "desc",
            "Pop!" as FunkoTipo,
            "Videojuegos" as FunkoGenero,
            "franquicia1",
            1,
            false,
            "none",
            25
        );

        const resultado = manager.actualizarFunko(funkoTest);

        expect(resultado).toBe(undefined);
        
    });

    test("Eliminar no existe", () => {
        let manager = new FunkoManager("usuarioTests");

        const resultado = manager.eliminarFunko(88);

        expect(resultado).toBe(undefined);
        
    });

    test("Eliminar", () => {
        let manager = new FunkoManager("usuarioTests");
        const resultado = manager.eliminarFunko(2);

        expect(resultado).toBe(undefined);
        
    });

    test("Lista de funkos no encuentra", () => {
        let manager = new FunkoManager("usuarioTests");
        const resultado = manager.listarFunkos();

        expect(resultado).toBe(undefined);
        
    });

    test("Agregar funko valor 0", () => {
        borrarDir();
        fs.rmdirSync("data/usuarioTests");
        let manager = new FunkoManager("usuarioTests");
        manager.addFunko(funkoTest2);
        manager.listarFunkos();
    });

    test("Agregar funko valor 0", () => {
        borrarDir();
        fs.rmdirSync("data/usuarioTests");
        let manager = new FunkoManager("usuarioTests");
        manager.addFunko(funkoTest3);
        manager.listarFunkos();
    });

    test("Agregar funko valor 0", () => {
        borrarDir();
        fs.rmdirSync("data/usuarioTests");
        let manager = new FunkoManager("usuarioTests");
        manager.addFunko(funkoTest4);
        manager.listarFunkos();
    });

    test("Agregar funko valor 0", () => {
        borrarDir();
        fs.rmdirSync("data/usuarioTests");
        let manager = new FunkoManager("usuarioTests");
        manager.addFunko(funkoTest5);
        manager.listarFunkos();
        borrarDir();
        fs.rmdirSync("data/usuarioTests");
    });
    


  });
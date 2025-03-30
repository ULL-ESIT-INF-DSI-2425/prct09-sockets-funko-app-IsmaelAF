import { Funko } from "./Funko.js";

export type ResponseType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    success: boolean;
    funkoPops?: Funko[];
}
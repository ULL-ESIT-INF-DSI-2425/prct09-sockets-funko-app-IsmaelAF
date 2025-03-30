import { Funko } from "./Funko.js";

export type RequestType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    user: string;
    funkoPop?: Funko;
    id?: number;
}
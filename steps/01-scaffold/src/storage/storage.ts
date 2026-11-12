import type { State } from "../domain/types";
export interface StoragePort{load():State|null;save(state:State):void;clear():void}
const key="bike-bay:v1";
export class BrowserStorage implements StoragePort{load(){const raw=localStorage.getItem(key);if(!raw)return null;try{const value=JSON.parse(raw) as State;if(value.schemaVersion!==1||!Array.isArray(value.bays))throw new Error("format");return value;}catch{localStorage.setItem(`${key}:damaged:${Date.now()}`,raw);localStorage.removeItem(key);return null;}}save(state:State){localStorage.setItem(key,JSON.stringify(state));}clear(){localStorage.removeItem(key);}}
export class MemoryStorage implements StoragePort{private value:State|null=null;load(){return this.value?structuredClone(this.value):null;}save(state:State){this.value=structuredClone(state);}clear(){this.value=null;}}

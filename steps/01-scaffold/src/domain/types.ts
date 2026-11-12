export type BayStatus = "available" | "occupied";
export type Bay = { id:string; label:string; status:BayStatus; bikeTag:string|null; startedAt:number|null };
export type State = { schemaVersion:1; bays:Bay[] };
export type Action = { type:"check-in"; bayId:string; bikeTag:string; now:number } | { type:"check-out"; bayId:string };

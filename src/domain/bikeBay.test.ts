import { describe,it,expect } from "vitest";
import { applyAction,createDemoState,validateBikeTag } from "./bikeBay";
describe("bike bay",()=>{it("validates a bike tag",()=>expect(validateBikeTag(" ").ok).toBe(false));it("checks in and out",()=>{const start=createDemoState();const id=start.bays[0].id;const parked=applyAction(start,{type:"check-in",bayId:id,bikeTag:"BX-1",now:10});expect(parked.bays[0].status).toBe("occupied");const free=applyAction(parked,{type:"check-out",bayId:id});expect(free.bays[0].status).toBe("available");});});

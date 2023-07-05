import { CreepFactory } from "../Infrastructure/Creep/creepFactory";
import { RoomState } from "./Types/RoomState";

export class Roomlet {
  public room: Room;
  public currentState: RoomState = new RoomState;
  public desiredState: RoomState = new RoomState;

  constructor(room: Room) {
    this.room = room;
  }

  public run() {
    if (this.currentState.numberOfHarvarters < this.desiredState.numberOfHarvarters)
      console.log("We need a new creep,");// this.CreateCreep('harvester', { role: 'harvester', room: this.room.name });
  }

  CreateCreep(role: string, memory: CreepMemory) {
    new CreepFactory(this.room).CreateCreep(role, memory);
  }
}

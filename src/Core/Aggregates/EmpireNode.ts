import { CreepFactory } from "../../Infrastructure/Creep/creepFactory";
import { RoomState } from "../Types/RoomState";

export class EmpireNode {
  public room: Room;
  public roomName;
  public currentState: RoomState = new RoomState;
  public desiredState: RoomState = new RoomState;

  constructor(room: Room) {
    this.room = room;
    this.roomName = this.room.name
  }

  public run() {
    if (this.currentState.numberOfHarvarters < this.desiredState.numberOfHarvarters)
      this.SpawnCreep('harvester', { role: 'harvester', room: this.room.name });
  }

  SpawnCreep(role: string, memory: CreepMemory) {
    new CreepFactory(this.room).CreateCreep(role, memory);
  }
}

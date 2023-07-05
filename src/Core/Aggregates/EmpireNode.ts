import { Consts } from "../../Infrastructure/Creep/consts";
import { CreepFactory } from "../../Infrastructure/Creep/creepFactory";
import { Process } from "../../OS/kernel/process";
import { RoomState } from "../Types/RoomState";

export class EmpireNode extends Process {
  public classPath(): string {
    return 'EmpireNode';
  }

  public setup(..._: any[]): Process {
    this.memory.roomName = _[0];
    this.desiredState = _[1];
    return this;
  }

  public desiredState: RoomState = new RoomState;

  public run(): number {
    let currentState = this.getCurrentState();
    if (currentState.numberOfHarvarters < this.desiredState.numberOfHarvarters)
      this.SpawnCreep(Consts.roleHarvester, { role: Consts.roleHarvester, room: this.memory.roomName });

    return 0;
  }

  getCurrentState(): RoomState {
    let currentState = new RoomState;
    currentState.numberOfHarvarters = Game.rooms[this.memory.roomName]
      .find(FIND_MY_CREEPS, {
        filter: (creep) => creep.memory.role == Consts.roleHarvester
      }).length;

    return currentState;
}
 

  SpawnCreep(role: string, memory: CreepMemory) {
    new CreepFactory(Game.rooms[this.memory.roomName]).CreateCreep(role, memory);
  }

  HarvestEnergy() {

  }
}

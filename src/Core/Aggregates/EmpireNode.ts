import { Consts } from "../../Infrastructure/Creep/consts";
import { Process } from "../../OS/kernel/process";
import { RoomState } from "../Types/RoomState";
import { commands, messageBrokerInstance } from "../../Infrastructure/messageBroker";

export class EmpireNode extends Process {

  public classPath(): string {
    return 'EmpireNode';
  }

  public setup(..._: any[]): Process {
    this.memory.roomName = _[0];
    this.memory.desiredState = _[1];
    return this;
  }

  public run(): number {
    const currentState = this.getCurrentState();
    if (currentState.numberOfHarvarters < this.memory.desiredState.numberOfHarvarters)
      messageBrokerInstance.publish("SpawnNewCreepCommand", { room: Game.rooms[this.memory.roomName], role: Consts.roleHarvester });

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

  HarvestEnergy() {

  }
}

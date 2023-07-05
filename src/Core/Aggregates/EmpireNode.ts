import { Process } from "../../OS/kernel/process";
import { RoomState } from "../ValueObjects/RoomState";
import { NodePopulation } from "./NodePopulation";
import { ProcessPriority } from "../../OS/kernel/constants";
import { RoomPopulationState } from "../ValueObjects/RoomPopulationState";

export class EmpireNode extends Process {

  public classPath(): string {
    return 'EmpireNode';
  }

  public setup(..._: any[]): Process {
    this.memory.roomName = _[0];
    return this;
  }

  public run(): number {
    const currentState = this.memory.currentState || new RoomState();

    debugger;
    const newProcess = this.kernel.addProcessIfNotExists(new NodePopulation(0, this.pid, ProcessPriority.Ticly)
      .setup(this.memory.roomName));

    const nodePopulation = <NodePopulation>newProcess;
    const desiredPopulationState = this.memory.desiredState || new RoomPopulationState();
    desiredPopulationState.numberOfHarvarters = 2;
    desiredPopulationState.numberOfCarriers = 2;
    desiredPopulationState.numberOfMiners = 2;
    desiredPopulationState.numberOfUpgraders = 2;
    desiredPopulationState.numberOfRepairers = 2;
    desiredPopulationState.numberOfBuilders = 2;

    nodePopulation.setDesiredPopulationState(desiredPopulationState);

    return 0;
  }
}

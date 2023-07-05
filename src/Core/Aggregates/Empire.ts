import { Process } from "../../OS/kernel/process";
import { EmpireNode } from "./EmpireNode";

export class Empire extends Process {
  public classPath(): string {
    return 'Empire';
  }
  public setup(..._: any[]): Process {
    this.memory.roomName = _[0];
    return this;
  }

  public nodes: EmpireNode[] = [];

  run(): number {
    _.forEach(Game.spawns, spawn => {
      if (!_.any(this.nodes, (node) => node.roomName === spawn.room.name))
        this.nodes.push(new EmpireNode(spawn.room));
    });

    _.forEach(this.nodes, node => {
      node.desiredState.numberOfHarvarters += 1;
      node.run();
    });

    return 0;
  }
}

export default Empire;

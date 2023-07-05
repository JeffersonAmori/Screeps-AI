import { ProcessPriority } from "../../OS/kernel/constants";
import { Process } from "../../OS/kernel/process";
import { EmpireNode } from "./EmpireNode";
import * as kernel from "OS/kernel/kernel";

export class Empire extends Process {
  public classPath(): string {
    return 'Empire';
  }
  public setup(..._: any[]): Process {
    this.memory = this.memory || {};
    this.memory.roomName = _[0];

    return this;
  }

  run(): number {
    debugger;
    _.forEach(Game.spawns, spawn => {
      var nodeProcess = kernel.addProcessIfNotExists(new EmpireNode(0, this.pid, ProcessPriority.Ticly))
        .setup(spawn.room.name, { numberOfHarvarters: 1 });

      this.memory.nodes = this.memory.nodes || [];
      if (!_.includes(this.memory.nodes, nodeProcess.pid))
        this.memory.nodes.push(nodeProcess.pid);
    });

    return 0;
  }
}

export default Empire;

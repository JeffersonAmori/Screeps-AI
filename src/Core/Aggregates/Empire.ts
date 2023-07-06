import * as kernel from "OS/kernel/kernel";
import { ProcessPriority } from "../../OS/kernel/constants";
import { Process } from "../../OS/kernel/process";
import { EmpireNode } from "./EmpireNode";

export class Empire extends Process {
  public classPath(): string {
    return 'Empire';
  }

  public setup(..._: any[]): Process {
    this.memory ??= {};
    this.memory.roomName = _[0];

    return this;
  }

  run(): number {
    _.forEach(Game.spawns, spawn => {
      var nodeProcess = kernel.addProcessIfNotExists(new EmpireNode(0, this.pid, ProcessPriority.Ticly))
        .setup(this.memory.roomName);

      this.memory.nodes = this.memory.nodes || [];
      if (!_.includes(this.memory.nodes, nodeProcess.pid))
        this.memory.nodes.push(nodeProcess.pid);
    });

    return 0;
  }
}

export default Empire;

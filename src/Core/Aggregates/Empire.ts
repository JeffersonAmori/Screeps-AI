import { Roomlet } from "../Roomlet";
import { EmpireNode } from "./EmpireNode";

export class Empire {
  constructor() {
    this.nodes = [];

    // Add all rooms to the empire.
    _.forEach(Game.spawns, spawn => {
      if (!_.any(this.nodes, (node) => node.roomName === spawn.room.name))
        this.nodes.push(new EmpireNode(new Roomlet(spawn.room)));
    });
  }

  public nodes: EmpireNode[];

  run() {
    _.forEach(this.nodes, node => {
      node.run();
    });
  }
}

export default Empire;

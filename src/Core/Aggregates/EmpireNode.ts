import { Roomlet } from "../Roomlet";

export class EmpireNode {
  public roomName: string;

  constructor(public commandlet: Roomlet) {
    this.roomName = commandlet.room.name;
  }

  public run() {
    this.commandlet.run();
  }
}

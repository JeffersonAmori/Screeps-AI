import { Process } from "../../kernel/process";

export class logProcess extends Process {
  public classPath(): string {
    return "logProcess";
  }

  public run(): number {
    console.log(`Current game tick is ${Game.time}`);
    return 0;
  }

  public setup(..._: any[]): Process {
    return this;
  }
}

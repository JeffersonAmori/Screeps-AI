import { Consts } from "../../../Infrastructure/Creep/consts";
import { Process } from "../../kernel/process";
import { BuilderProcess } from "../creep/townsfolk/builder";
import { CarrierProcess } from "../creep/townsfolk/carrier";
import { HarvesterProcess } from "../creep/townsfolk/harvester";
import { MinerProcess } from "../creep/townsfolk/miner";
import { RepairerProcess } from "../creep/townsfolk/repairer";
import { UpgraderProcess } from "../creep/townsfolk/upgrader";

export class creepActProcess extends Process {
  public classPath(): string {
    return 'creepActProcess'; 
  }
  public run(): number {
    this.CreepsAct();
    return 0;
  }
  public setup(..._: any[]): Process {
    this.memory = this.memory || {};
    this.memory.roomName = _[0];
    return this;
  }

  CreepsAct(): void {
    _.forEach(Game.creeps, creep => {
      if (creep.spawning) return;

      switch (creep.memory.role) {
        case Consts.roleHarvester: {
          this.startCreepProcess(creep, new HarvesterProcess(0, this.pid));
          break;
        }
        case Consts.roleMiner: {
          this.startCreepProcess(creep, new MinerProcess(0, this.pid));
          break;
        }
        case Consts.roleCarrier: {
          this.startCreepProcess(creep, new CarrierProcess(0, this.pid));
          break;
        }
        case Consts.roleUpgrader: {
          this.startCreepProcess(creep, new UpgraderProcess(0, this.pid));
          break;
        }
        case Consts.roleBuilder: {
          this.startCreepProcess(creep, new BuilderProcess(0, this.pid));
          break;
        }
        case Consts.roleRepairer: {
          this.startCreepProcess(creep, new RepairerProcess(0, this.pid));
          break;
        }
        default: {
          break;
        }
      }
    })
  }

  startCreepProcess(creep: Creep, process: Process): void {
    if (!creep.memory.processId || !this.kernel.getProcessById(creep.memory.processId)) {
      let newProcess = this.kernel.addProcess(process);
      newProcess.setup(creep.id);
      creep.memory.processId = newProcess.pid;
    }
  }
}

//import * as kernel from "OS/kernel/kernel";

import { Consts } from "../../../Infrastructure/Creep/consts";
import { Process } from "../../kernel/process";
import { DiplomatProcess } from "../creep/diplomacy/diplomat";
import { PillagerProcess } from "../creep/explorers/pillager";
import { PioneerProcess } from "../creep/explorers/pioneer";
import { SoldierProcess } from "../creep/military/soldier";
import { BuilderProcess } from "../creep/townsfolk/builder";
import { CarrierProcess } from "../creep/townsfolk/carrier";
import { CarrierLinkerProcess } from "../creep/townsfolk/carrierLinker";
import { HarvesterProcess } from "../creep/townsfolk/harvester";
import { MinerProcess } from "../creep/townsfolk/miner";
import { MinerLinkerProcess } from "../creep/townsfolk/minerLinker";
import { RepairerProcess } from "../creep/townsfolk/repairer";
import { UpgraderProcess } from "../creep/townsfolk/upgrader";

export class CreepController extends Process {
  public classPath(): string {
    return 'CreepController'; 
  }
  public run(): number {
    this.CreepsAct();
    return 0;
  }
  public setup(..._: any[]): Process {
    throw new Error("Method not implemented.");
  }

  CreepsAct(): void {
    _.forEach(Game.creeps, creep => {
      if (creep.spawning) return;

      switch (creep.memory.role) {
        case Consts.roleHarvester: {
          // Maybe try to fork the process here?
          //kernel.forkProcess(this, new HarvesterProcess(0, this.pid));
          this.startCreepProcess(creep, new HarvesterProcess(0, this.pid));
          break;
        }
        case Consts.roleMiner: {
          this.startCreepProcess(creep, new MinerProcess(0, this.pid));
          break;
        }
        case Consts.roleMinerLinker: {
          this.startCreepProcess(creep, new MinerLinkerProcess(0, this.pid));
          break;
        }
        case Consts.roleCarrier: {
          this.startCreepProcess(creep, new CarrierProcess(0, this.pid));
          break;
        }
        case Consts.roleCarrierTeleporter: {
          this.startCreepProcess(creep, new CarrierLinkerProcess(0, this.pid));
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
        case Consts.rolePioneer: {
          this.startCreepProcess(creep, new PioneerProcess(0, this.pid));
          break;
        }
        case Consts.rolePillager: {
          this.startCreepProcess(creep, new PillagerProcess(0, this.pid));
          break;
        }
        case Consts.roleSoldier: {
          this.startCreepProcess(creep, new SoldierProcess(0, this.pid));
          break;
        }
        case Consts.roleDiplomat: {
          this.startCreepProcess(creep, new DiplomatProcess(0, this.pid));
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

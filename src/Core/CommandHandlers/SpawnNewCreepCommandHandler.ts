import { CreepFactory } from "../../Infrastructure/Creep/creepFactory";
import { SpawnNewCreepCommand } from "../Commands/SpawnNewCreepCommand";

export class SpawnNewCreepCommandHandler {
  public static handle(spawnNewCreepCommand: SpawnNewCreepCommand) {
    debugger;
    console.log('SpawnNewCreepCommandHandler handling new ' + spawnNewCreepCommand.role);
    new CreepFactory(spawnNewCreepCommand.room).CreateCreep(spawnNewCreepCommand.role, spawnNewCreepCommand.creepMemory);
  }
}

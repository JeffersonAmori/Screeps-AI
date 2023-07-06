import { CreepFactory } from "../../Infrastructure/Creep/creepFactory";
import { SpawnNewCreepCommand } from "../Commands/SpawnNewCreepCommand";

const waitTimersForRooms: { [key: string]: { nextTick: number } } = {}

export class SpawnNewCreepCommandHandler {
  public static handle(spawnNewCreepCommand: SpawnNewCreepCommand) {
    const roomTimer = waitTimersForRooms[spawnNewCreepCommand.room.name];
    if (roomTimer && roomTimer.nextTick > Game.time)
      return;

    console.log('SpawnNewCreepCommandHandler handling new ' + spawnNewCreepCommand.role);
    const result = new CreepFactory(spawnNewCreepCommand.room).CreateCreep(spawnNewCreepCommand.role, spawnNewCreepCommand.creepMemory);
    if (result > OK)
      waitTimersForRooms[spawnNewCreepCommand.room.name] = { nextTick: Game.time + result };
  }
}

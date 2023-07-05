
export class SpawnNewCreepCommand {
  constructor(
    public room: Room,
    public role: string,
    public creepMemory?: CreepMemory) {
    }
}

import { Consts } from "../../Infrastructure/Creep/consts";
import { Process } from "../../OS/kernel/process";
import { RoomPopulationState } from "../ValueObjects/RoomPopulationState";
import { messageBrokerInstance } from "../../Infrastructure/messageBroker";

export class NodePopulation extends Process {

  private _room?: Room;

  public classPath(): string {
    return "NodePopulation";
  }

  public run(): number {
    this.memory = this.memory || {};
    this._room = Game.rooms[this.memory.roomName];
    this.createCreeps();

    return 0;
  }

  public override setup(..._: any[]): Process {
    this.memory ??= {};
    this.memory.roomName = _[0];
    return this;
  }

  createCreeps(): void {
    if (!this._room)
      return;

    const controller = this._room.controller;
    if (!controller)
      return;

    const currentState = this.getCurrentPopulationState();
    const desiredState: RoomPopulationState = this.memory.desiredState || new RoomPopulationState();

    currentState.noActiveResourceHarvest = (currentState.numberOfCarriers === 0 || currentState.numberOfMiners === 0) && currentState.numberOfHarvarters === 0;

    if (currentState.numberOfHarvarters < desiredState.numberOfHarvarters)
      messageBrokerInstance.publish("SpawnNewCreepCommand", { role: Consts.roleHarvester, room: this._room });
    if (currentState.numberOfCarriers < desiredState.numberOfCarriers)
      messageBrokerInstance.publish("SpawnNewCreepCommand", { role: Consts.roleCarrier, room: this._room });
    if (currentState.numberOfMiners < desiredState.numberOfMiners)
      messageBrokerInstance.publish("SpawnNewCreepCommand", { role: Consts.roleMiner, room: this._room });
    if (currentState.numberOfUpgraders < desiredState.numberOfUpgraders)
      messageBrokerInstance.publish("SpawnNewCreepCommand", { role: Consts.roleUpgrader, room: this._room });
    if (currentState.numberOfBuilders < desiredState.numberOfBuilders)
      messageBrokerInstance.publish("SpawnNewCreepCommand", { role: Consts.roleBuilder, room: this._room });
    if (currentState.numberOfRepairers < desiredState.numberOfRepairers)
      messageBrokerInstance.publish("SpawnNewCreepCommand", { role: Consts.roleRepairer, room: this._room });

    this.memory.currentState = currentState;
  }

  setDesiredPopulationState(state: RoomPopulationState) {
    this.memory.desiredState = state;
    // TODO: Make this work on setup.
    this.memory.roomName = 'sim';
  }

  getCurrentPopulationState(): RoomPopulationState {
    if (!this._room)
      return new RoomPopulationState;

    let currentState = new RoomPopulationState;

    const roomsCreeps = this._room.find(FIND_MY_CREEPS);

    const harvesters = _.filter(roomsCreeps, (c) => c.memory.role === Consts.roleHarvester);
    const carriers = _.filter(roomsCreeps, (c) => c.memory.role === Consts.roleCarrier && c.ticksToLive && c.ticksToLive > Consts.minTicksBeforeSpawningReplacement);
    const miners = _.filter(roomsCreeps, (c) => c.memory.role === Consts.roleMiner);
    const upgraders = _.filter(roomsCreeps, (c) => c.memory.role === Consts.roleUpgrader);
    const repairer = _.filter(roomsCreeps, (c) => c.memory.role === Consts.roleRepairer);

    currentState.numberOfHarvarters = harvesters.length;
    currentState.numberOfCarriers = carriers.length;
    currentState.numberOfMiners = miners.length;
    currentState.numberOfUpgraders = upgraders.length;
    currentState.numberOfRepairers = repairer.length;

    return currentState;
  }

  getSleepTimer(): number {
    if (!this._room)
      return -1;

    const creepsInThisRoom: Creep[] | null = _.sortBy(this._room.find(FIND_MY_CREEPS), c => c.ticksToLive);
    if (creepsInThisRoom && creepsInThisRoom.length > 0) {
      const nextCreepToDie = creepsInThisRoom[0];
      if (nextCreepToDie.ticksToLive)
        return nextCreepToDie.ticksToLive;
    }

    return -1;
  }
}

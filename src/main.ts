import * as kernel from "OS/kernel/kernel";
import MemoryController from "OS/processes/memory/memoryController";
import { ErrorMapper } from "utils/ErrorMapper";
import { Empire } from "Core/Aggregates/Empire";
import { logProcess } from "OS/processes/logProcess";
import { ProcessPriority } from "./OS/kernel/constants";
import { messageBrokerInstance } from "./Infrastructure/messageBroker";
import { SpawnNewCreepCommandHandler } from "./Core/CommandHandlers/SpawnNewCreepCommandHandler";
import { garbageCollectionProcess } from "./OS/processes/memory/garbageCollection";
import { creepActProcess } from "./OS/processes/global/creepActProcess";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  initTick();

  const roomName = Game.spawns['Spawn1'].room.name;
  debugger;
  kernel.addProcessIfNotExists(new Empire(0, 0, ProcessPriority.Ticly).setup(roomName));
  kernel.addProcessIfNotExists(new creepActProcess(0, 0, ProcessPriority.Ticly).setup(roomName));
  kernel.addProcessIfNotExists(new garbageCollectionProcess(0, 0, ProcessPriority.TiclyLast));
  kernel.addProcessIfNotExists(new logProcess(0, 0, ProcessPriority.TiclyLast));

  kernel.run();

  finishTick();
});

function initTick() {
  registerEventHandlers();
  MemoryController.loadMemory();
}
function registerEventHandlers() {
  messageBrokerInstance.subscribe("SpawnNewCreepCommand", (message) => { SpawnNewCreepCommandHandler.handle(message); });
}

function finishTick() {
  MemoryController.saveMemory();
}

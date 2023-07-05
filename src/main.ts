import { ErrorMapper } from "utils/ErrorMapper";
import { Empire } from "Core/Aggregates/Empire";
import * as kernel from "OS/kernel/kernel";
import { logProcess } from "OS/processes/logProcess";
import { ProcessPriority } from "./OS/kernel/constants";
import MemoryController from "OS/processes/memory/memoryController";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  initTick();

  kernel.run();
  kernel.addProcessIfNotExists(new logProcess(0, 0, ProcessPriority.Ticly));
  kernel.addProcessIfNotExists(new Empire(0, 0, ProcessPriority.Ticly));

  finishTick();
});

function initTick() {
  MemoryController.loadMemory();
}
function finishTick() {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps)
    if (!(name in Game.creeps))
      delete Memory.creeps[name];

  MemoryController.saveMemory();
}

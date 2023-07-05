import * as kernel from "../../kernel/kernel";

let MemoryController = {
  saveMemory: function () {
    kernel.storeProcessTable();
  },

  loadMemory: function () {
    kernel.loadProcessTable();
    Memory.processMemory = Memory.processMemory || [];
    Memory.kernelMemory = Memory.kernelMemory || { printProcess: true };
  },
}

export default MemoryController;

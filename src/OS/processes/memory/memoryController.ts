import * as kernel from "../../kernel/kernel";

let MemoryController = {
  saveMemory: function () {
    debugger;
    kernel.storeProcessTable();
  },

  loadMemory: function () {
    debugger;
    kernel.loadProcessTable();
    Memory.processMemory = Memory.processMemory || [];
    Memory.kernelMemory = Memory.kernelMemory || { printProcess: true };
  },
}

export default MemoryController;

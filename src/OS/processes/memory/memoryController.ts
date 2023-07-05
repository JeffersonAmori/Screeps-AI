import * as kernel from "../../kernel/kernel";

let MemoryController = {
  saveMemory: function () {
    //Memory.RoomsInfo = JSON.stringify(GlobalMemory.RoomInfo);
    kernel.storeProcessTable();
  },

  loadMemory: function () {
    kernel.loadProcessTable();
    //if (Memory.RoomsInfo.length > 0) {
    //  GlobalMemory.RoomInfo = JSON.parse(Memory.RoomsInfo);
    //}
    Memory.processMemory = Memory.processMemory || [];
    Memory.kernelMemory = Memory.kernelMemory || { printProcess: false };
  },
}

export default MemoryController;

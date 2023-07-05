import { IDomainProcessMemory } from "./IDomainProcessMemory";

export interface IDomainProcess {
  ProcessMemory: IDomainProcessMemory;
  run(): void;
}

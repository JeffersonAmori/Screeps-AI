export class Empire {
  constructor() {
    this.rooms = [];

    // Add all rooms to the empire.
    _.forEach(Game.spawns, spawn => {
      if (!_.includes(this.rooms, spawn.room))
        this.rooms.push(spawn.room);
    });
  }

  public rooms: Room[];
}

export default Empire;

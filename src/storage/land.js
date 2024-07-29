class LandStorage {
    constructor() {
        this.lands = new Map();
    }

    addLand(land) {
        this.lands.set(land.id, land);
    }

    getLandById(id) {
        return this.lands.get(id);
    }

    updateLand(land) {
        this.lands.set(land.id, land);
    }

    getAllLands() {
        return Array.from(this.lands.values());
    }
}

export const landStorage = new LandStorage();

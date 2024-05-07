import { Planet } from './Planet';

export default class SpaceSlot {
    planet: Planet | null;
    constructor() {
        this.planet = null;
    }

    setPlanet(planet: Planet) {
        this.planet = planet;
    }
}
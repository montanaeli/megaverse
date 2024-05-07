import { Cometh, Planet, Polyanet, Soloon } from "./Planet";
import SpaceSlot from "./SpaceSlot";
import polyanetApi from "../api-client/polyanet";
import wait from "../utils/wait";
import { loadGoal } from "../api-client/map";

export default class Map {
  sizeX: number;
  sizeY: number;

  slots: SpaceSlot[][];

  constructor(sizeX: number, sizeY: number) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    this.slots = new Array(sizeX);
    for (let x = 0; x < sizeX; x++) {
      this.slots[x] = new Array(sizeY);
      for (let y = 0; y < sizeY; y++) {
        this.slots[x][y] = new SpaceSlot();
      }
    }
  }

  getSlot(x: number, y: number) {
    return this.slots[x][y];
  }

  async clean() {
    for (let row = 0; row < this.sizeX; row++) {
      for (let column = 0; column < this.sizeY; column++) {
        let responseOk = false;
        while (!responseOk) {
          try {
            await polyanetApi.deletePolyanet(row, column);
            responseOk = true;
          } catch (e: any) {
            if (e.message === "ApiBusy") {
              await wait(5000);
            } else {
              throw e;
            }
          }
        }
      }
    }
  }

  static async loadFromApi(){
    const goal = await loadGoal();
    if(!goal){
      throw new Error("Error loading goal map");
    }
    const sizeX = goal.length;
    const sizeY = goal[0].length;
    const newMap = new Map(sizeX, sizeY);
    for (let row = 0; row < newMap.sizeX; row++) {
      for (let column = 0; column < newMap.sizeY; column++) {
        const currentSlot = goal[row][column];
        const mapSlot = newMap.getSlot(row, column)
        if(currentSlot === "POLYANET"){
          mapSlot.setPlanet(new Polyanet());
        } else {
          if ( currentSlot !== "SPACE") {
            const [data, type] = currentSlot.split("_");
            if (type === "SOLOON") {
              mapSlot.setPlanet(new Soloon(data))
            } else {
              if (type === "COMETH") {
                mapSlot.setPlanet(new Cometh(data))
              }
            }
          }
        }
      }
    }
    return newMap;
  }

  async writeToApi() {
    console.log("Writing to API");
    for (let row = 0; row < this.sizeX; row++) {
      for (let column = 0; column < this.sizeY; column++) {
        const actualPlanet = this.slots[row][column].planet;
        if (actualPlanet) {
          let responseOk = false;
          while (!responseOk) {
            try {
              actualPlanet.writeToApi(row, column)
              responseOk = true;
            } catch (e: any) {
              if (e.message === "ApiBusy") {
                await wait(5000);
              } else {
                throw e;
              }
            }
          }
        }
      }
    }
  }
}

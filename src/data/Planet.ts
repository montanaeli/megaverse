import comethApi, { Direction } from "../api-client/cometh";
import polyanetApi from "../api-client/polyanet";
import soloonApi, { Color } from "../api-client/soloon";
import wait from "../utils/wait";

type Name =
  | "SPACE"
  | "RIGHT_COMETH"
  | "POLYANET"
  | "UP_COMETH"
  | "WHITE_SOLOON"
  | "LEFT_COMETH"
  | "BLUE_SOLOON"
  | "PURPLE_SOLOON"
  | "DOWN_COMETH"
  | "RED_SOLOON";

export abstract class Planet {
  abstract writeToApi(row: number, column: number): Promise<void>;

  static GetFromName(name: Name) {
    if (name === "SPACE") {
      return null;
    } else if (name === "POLYANET") {
      return new Polyanet();
    } else if (name.endsWith("_COMETH")) {
      const direction = name.split("_")[0];
      return new Cometh(direction);
    } else if (name.endsWith("_SOLOON")) {
      const color = name.split("_")[0];
      return new Soloon(color);
    } else {
      return null;
    }
  }
}

export class Polyanet extends Planet {
  constructor() {
    super();
  }

  async writeToApi(row: number, column: number): Promise<void> {
    let responseOk = false;
    while (!responseOk) {
      try {
        await polyanetApi.createPolyanet(row, column);
        console.log(`Slot (${row}, ${column}) now contains a Polyanet`);
        responseOk = true;
      } catch (e: any) {
        if (e.message === "ApiBusy") {
          await wait(1000);
        } else {
          throw e;
        }
      }
    }
  }
}

export class Soloon extends Planet {
  color: "BLUE" | "RED" | "PURPLE" | "WHITE";

  constructor(color: string) {
    super();
    if (this.isColorValid(color)) {
      this.color = color as "BLUE" | "RED" | "PURPLE" | "WHITE";
    } else {
      throw new Error(`Invalid color: ${color}`);
    }
  }

  private isColorValid(
    color: string
  ): color is "BLUE" | "RED" | "PURPLE" | "WHITE" {
    return ["BLUE", "RED", "PURPLE", "WHITE"].includes(color);
  }

  async writeToApi(row: number, column: number): Promise<void> {
    let responseOk = false;
    while (!responseOk) {
      try {
        const soloonColor = this.color.toLowerCase() as Color;
        await soloonApi.createSoloon(row, column, soloonColor);
        console.log(`Slot (${row}, ${column}) now contains a Soloon`);
        responseOk = true;
      } catch (e: any) {
        if (e.message === "ApiBusy") {
          await wait(1000);
        } else {
          throw e;
        }
      }
    }
  }
}

export class Cometh extends Planet {
  direction: "UP" | "DOWN" | "RIGHT" | "LEFT";

  constructor(direction: string) {
    super();
    if (this.isDirectionValid(direction)) {
      this.direction = direction as "UP" | "DOWN" | "RIGHT" | "LEFT";
    } else {
      throw new Error(`Invalid direction: ${direction}`);
    }
  }

  private isDirectionValid(
    direction: string
  ): direction is "UP" | "DOWN" | "RIGHT" | "LEFT" {
    return ["UP", "DOWN", "RIGHT", "LEFT"].includes(direction);
  }

  async writeToApi(row: number, column: number): Promise<void> {
    let responseOk = false;
    while (!responseOk) {
      try {
        const comethDirection = this.direction.toLowerCase() as Direction;
        await comethApi.createCometh(row, column, comethDirection);
        console.log(`Slot (${row}, ${column}) now contains a Cometh`);
        responseOk = true;
      } catch (e: any) {
        if (e.message === "ApiBusy") {
          await wait(1000);
        } else {
          throw e;
        }
      }
    }
  }
}

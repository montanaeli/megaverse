import comethApi from "../api-client/cometh";
import polyanetApi from "../api-client/polyanet";
import soloonApi from "../api-client/soloon";

export abstract class Planet {
  abstract writeToApi(row: number, column: number): Promise<void>;
}

export class Polyanet extends Planet {
  constructor() {
    super();
  }

  async writeToApi(row: number, column: number): Promise<void> {
    try {
      await polyanetApi.createPolyanet(row, column);
      console.log(`Slot (${row}, ${column}) now contains a Polyanet`);
    } catch (e) {
      throw new Error("ApiBusy");
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
    try {
      await soloonApi.createSoloon(row, column, this.color);
      console.log(`Slot (${row}, ${column}) now contains a Soloon`);
    } catch (e) {
      throw new Error("ApiBusy");
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
    try {
      await comethApi.createCometh(row, column, this.direction);
      console.log(`Slot (${row}, ${column}) now contains a Cometh`);
    } catch (e) {
      throw new Error("ApiBusy");
    }
  }
}

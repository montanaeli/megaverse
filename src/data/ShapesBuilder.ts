import Map from "./Map";

type ShapeConfig = {
  type: "X";
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
};

export default class ShapeBuilder {
  map: Map;
  config: ShapeConfig;

  constructor(map: Map, config: ShapeConfig) {
    this.map = map;
    this.config = config;
  }

  build() {
    // Check if the margins are valid
    if (
      (this.config.marginTop || 0) + (this.config.marginBottom || 0) >
      this.map.sizeY
    ) {
      throw new Error("Invalid top and bottom margins");
    }
    if (
      (this.config.marginLeft || 0) + (this.config.marginRight || 0) >
      this.map.sizeX
    ) {
      throw new Error("Invalid left and right margins");
    }

    // Create the shape
    const shapeCoords: { x: number; y: number }[] = [];

    let currentX = this.config.marginLeft || 0;
    let currentY = this.config.marginTop || 0;

    const maxX = this.map.sizeX - (this.config.marginRight || 0);
    const maxY = this.map.sizeY - (this.config.marginBottom || 0);

    while (currentX < maxX && currentY < maxY) {
      if (this.config.type === "X") {
        if (currentX === currentY) {
          shapeCoords.push({ x: currentX, y: currentY });
          shapeCoords.push({ x: currentX, y: maxY - currentY + 1 });
        }
      }
      currentX++;
      currentY++;
    }

    return shapeCoords;
  }
}

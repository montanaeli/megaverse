import Map from "./data/Map";
import { Polyanet, Soloon } from "./data/Planet";
import ShapeBuilder from "./data/ShapesBuilder";
import prompt from "prompt-sync";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
  console.log("Welcome to the Megaverse!");

  let phaseId = 0;
  let userResponse = prompt()("What phase would you like to start? (1-3) or \"clean\" if you want to clean the map: ");
  while (["1", "2", "3", "clean"].indexOf(userResponse) === -1) {
    userResponse = prompt()(
      "Invalid phase. Please enter a number between 1 and 3 or \"clean\""
    );
  }
  if(userResponse === "clean"){
    let phaseId = 0;
    let userResponse = prompt()("What phase would you like to clean? (1-3)");
    while (["1", "2", "3"].indexOf(userResponse) === -1) {
      userResponse = prompt()(
        "Invalid phase. Please enter a number between 1 and 3"
      );
    }
    phaseId = parseInt(userResponse);
    if(phaseId === 1){
      const sizeX = 11;
      const sizeY = 11;
      const map = new Map(sizeX, sizeY);
      await map.clean();
      console.log("Map cleaned!")
    } else if (phaseId === 2) {
      console.log("Phase 2 is not implemented yet");
    } else if (phaseId === 3) {
      console.log("Phase 3 is not implemented yet");
    }
  } else {
    phaseId = parseInt(userResponse);

    console.log(`Starting phase ${phaseId}`);
    
    if (phaseId === 1) {
      const sizeX = 11;
      const sizeY = 11;
    
      const map = new Map(sizeX, sizeY);
    
      const shape = new ShapeBuilder(map, {
        type: "X",
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 2,
        marginRight: 2,
      });
      const shapeCoords = shape.build();
    
      shapeCoords.forEach((coord) => {
        map.getSlot(coord.x, coord.y).setPlanet(new Polyanet());
      });
    
      map.writeToApi();
    } else if (phaseId === 2) {
      const map = await Map.loadFromApi();
      map.writeToApi();
    } else if (phaseId === 3) {
      console.log("Phase 3 is not implemented yet");
    }
  }
}

run();
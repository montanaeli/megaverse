import axios from "../lib/axiosInstance";

type Direction = "UP" | "DOWN" | "RIGHT" | "LEFT";

export async function createCometh(
  row: number,
  column: number,
  direction: Direction
) {
  const response = await axios.post(`comeths/`, { row, column, direction });
  if (response) {
    console.log(
      `Cometh created on row ${row}, column ${column} and direction ${direction}`
    );
  } else {
    throw new Error("There was an error creating the Cometh.");
  }
}

export async function deleteCometh(row: number, column: number) {
  const response = await axios.delete(`comeths/`, { data: { row, column } });
  if (response) {
    console.log(`Cometh deleted on row ${row} and column ${column}`);
  } else {
    throw new Error("There was an error deleting the Cometh.");
  }
}

const comethApi = {
  createCometh,
  deleteCometh,
};

export default comethApi;

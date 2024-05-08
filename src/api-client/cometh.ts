import axios from "../lib/axiosInstance";

export type Direction = "up" | "down" | "right" | "left";

export async function createCometh(
  row: number,
  column: number,
  direction: Direction
) {
  try {
    const response = await axios.post(`comeths/`, { row, column, direction });
    console.log(response.status);
    if (response) {
      console.log(
        `Cometh created on row ${row}, column ${column} and direction ${direction}`
      );
    } else {
      throw new Error("There was an error creating the Cometh.");
    }
  } catch (e: any) {
    if (e.response.status === 429) {
      throw new Error("ApiBusy");
    }
  }
}

export async function deleteCometh(row: number, column: number) {
  try {
    const response = await axios.delete(`comeths/`, { data: { row, column } });
    if (response) {
      console.log(`Cometh deleted on row ${row} and column ${column}`);
    } else {
      throw new Error("There was an error deleting the Cometh.");
    }
  } catch (e: any) {
    if (e.response.status === 429) {
      throw new Error("ApiBusy");
    }
  }
}

const comethApi = {
  createCometh,
  deleteCometh,
};

export default comethApi;

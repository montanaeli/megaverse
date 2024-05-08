import axios from "../lib/axiosInstance";

export type Color = "blue" | "red" | "purple" | "white";

export async function createSoloon(row: number, column: number, color: Color) {
  try {
    const response = await axios.post(`soloons/`, { row, column, color });
    if (response) {
      console.log(
        `Soloon created on row ${row}, column ${column} and color ${color}`
      );
    } else {
      throw new Error("There was an error creating the Soloon.");
    }
  } catch (e: any) {
    if (e.response.status === 429) {
      throw new Error("ApiBusy");
    }
  }
}

export async function deleteSoloon(row: number, column: number) {
  try {
    const response = await axios.delete(`soloons/`, { data: { row, column } });
    if (response) {
      console.log(`Soloon deleted on row ${row} and column ${column}`);
    } else {
      throw new Error("There was an error deleting the Soloon.");
    }
  } catch (e: any) {
    if (e.response.status === 429) {
      throw new Error("ApiBusy");
    }
  }
}

const soloonApi = {
  createSoloon,
  deleteSoloon,
};

export default soloonApi;

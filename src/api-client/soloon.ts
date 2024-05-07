import axios from "../lib/axiosInstance";

type Color = "BLUE" | "RED" | "PURPLE" | "WHITE";

export async function createSoloon(row: number, column: number, color: Color) {
  const response = await axios.post(`soloons/`, { row, column, color });
  if (response) {
    console.log(
      `Soloon created on row ${row}, column ${column} and color ${color}`
    );
  } else {
    throw new Error("There was an error creating the Soloon.");
  }
}

export async function deleteSoloon(row: number, column: number) {
  const response = await axios.delete(`soloons/`, { data: { row, column } });
  if (response) {
    console.log(`Soloon deleted on row ${row} and column ${column}`);
  } else {
    throw new Error("There was an error deleting the Soloon.");
  }
}

const soloonApi = {
  createSoloon,
  deleteSoloon,
};

export default soloonApi;

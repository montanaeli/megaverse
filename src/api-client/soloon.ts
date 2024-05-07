import axios from "../lib/axiosInstance";

export async function createSoloon(data: any, color: string) {
  const response = await axios.post(`soloons/`, data);
  if (response) {
    console.log(
      `Soloon created on row ${data.row}, column ${data.column} and color ${data.color}`
    );
  } else {
    throw new Error("There was an error creating the soloon.");
  }
}

export async function deleteSoloon(data: any) {
    const response = await axios.delete(`soloons/`, data);
    if (response) {
      console.log(
        `Soloon deleted on row ${data.row} and column ${data.column}`
      );
    } else {
      throw new Error("There was an error deleting the soloon.");
    }
  }

const soloonApi = {
  createSoloon,
  deleteSoloon
}
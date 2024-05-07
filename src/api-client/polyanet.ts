import axios from "../lib/axiosInstance";

export async function createPolyanet(row: number, column: number) {
  try {
    const response = await axios.post(`polyanets/`, { row, column })
    if (response) {
      console.log(
        `Polyanet created on row ${row} and column ${column}`
      );
    } else {
      throw new Error("There was an error creating the polyanet.");
    }
  } catch(e: any){
    if(e.response.status === 429){
      throw new Error("ApiBusy");
    }
  }
}

export async function deletePolyanet(row: number, column: number) {
  try {
    const response = await axios.delete(`polyanets/`, { data: {row, column }});
    if (response) {
      console.log(
        `Polyanet deleted on row ${row} and column ${column}`
      );
    } else {
      throw new Error("There was an error deleting the polyanet.");
    }
  } catch(e: any){
    if(e.response.status === 429){
      throw new Error("ApiBusy");
    }
  }
}

const polyanetApi = {
  createPolyanet,
  deletePolyanet,
};

export default polyanetApi;

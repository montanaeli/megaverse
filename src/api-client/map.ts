import axios from "../lib/axiosInstance";

type Slot = "SPACE" | "RIGHT_COMETH" | "POLYANET"
type Goal = Slot[][]

export async function loadGoal() {
  try {
    const candidateId = process.env.candidateId
    const response = await axios.get(`map/${candidateId}/goal`);
    if (response) {
      return response.data.goal as Goal;
    } else {
      throw new Error("There was an error creating the polyanet.");
    }
  } catch(e: any){
    if(e.response.status === 429){
      throw new Error("ApiBusy");
    }
  }
}

const api = {
  loadGoal,
};

export default api;

import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/player'

export const allPlayers = () => axios.get(REST_API_BASE_URL)



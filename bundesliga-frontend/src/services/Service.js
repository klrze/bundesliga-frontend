import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/player'
const REST_API_BASE_URL_TEAM_PLAYER = 'http://localhost:8080/api/team_player'

export const allPlayers = () => axios.get(REST_API_BASE_URL)

export const copyPlayerToSelected = (teamPlayer) => 
  axios.post(`http://localhost:8080/api/team_player`,  teamPlayer );

export const deleteTeamPlayer = (id) => 
  axios.delete(`http://localhost:8080/api/team_player/id/${id}`);

export const allTeamPlayers = () => axios.get(REST_API_BASE_URL_TEAM_PLAYER);

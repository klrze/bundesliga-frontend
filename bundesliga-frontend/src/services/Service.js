import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/player';
const REST_API_BASE_URL_TEAM_PLAYER = 'http://localhost:8080/api/team_player';

// Get all players
export const allPlayers = () => axios.get(REST_API_BASE_URL);

// Add a player to team_player table
export const copyPlayerToSelected = (teamPlayer) => 
  axios.post(`${REST_API_BASE_URL_TEAM_PLAYER}`, teamPlayer);

// Delete a team player by id
export const deleteTeamPlayer = (id) => 
  axios.delete(`${REST_API_BASE_URL_TEAM_PLAYER}/id/${id}`);

// Get all team players
export const allTeamPlayers = () => axios.get(REST_API_BASE_URL_TEAM_PLAYER);

// Update starting position for a player
export const updateStartPos = (id, startPos) => 
  axios.put(`${REST_API_BASE_URL_TEAM_PLAYER}/start_pos/${id}`, { startPos });

// Update bench/start status for a player
export const updateStartBench = (id, status) => {
  return axios.put(`${REST_API_BASE_URL_TEAM_PLAYER}/start_bench/${id}`, { benchStart: status });
};

// Assign position to player (new)
export const assignPosition = (playerId, position) => {
  return axios.post(`${REST_API_BASE_URL_TEAM_PLAYER}/assign_position`, {
    playerId,
    position
  });
};

// Unassign position from player (new)
export const unassignPosition = (playerId, position) => {
  return axios.post(`${REST_API_BASE_URL_TEAM_PLAYER}/unassign_position`, {
    playerId,
    position
  });
};

import axios from "axios";

const SERVER_URL = "http://localhost:9000";

export const getAllGroups = async () => {
  const url = `${SERVER_URL}/groups`;
  return await axios.get(url);
};

export const getGroupById=groupId=>{
  const url=`${SERVER_URL}/groups/${groupId}`
  return axios.get(url)
}
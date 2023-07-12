import axios from "axios";

const SERVER_URL = "http://localhost:9000";

export const getAllContacts = () => {
  const url = `${SERVER_URL}/contacts`;
  return axios.get(url);
};

export const getContactById = (id) => {
  const url = `${SERVER_URL}/contacts/${id}`;
  return axios.get(url);
};

export const addContact=contact=>{
    const url=`${SERVER_URL}/contacts`
    axios.post(url,contact)
}

export const updateContact = (id, data) => {
  const url = `${SERVER_URL}/contacts/${id}`;
  axios.put(url, data);
};

export const removeContact = (id) => {
  const url = `${SERVER_URL}/contacts/${id}`;
  axios.delete(url);
};

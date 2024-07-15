import { useMutation } from "@tanstack/react-query";
import axios from 'axios';

const API_URL = 'https://app-membership.onrender.com';

export const createMember = async (requestBody: any) => {

  return axios
    .post(`${API_URL}/create_member_website`, requestBody)
    .then(({ data: newsubs }) => {
      return newsubs
    })
    .catch((error) => {
      throw error
    })
}

export const useCreateMember = () => {
  // @ts-ignore
  return useMutation(createMember)
}




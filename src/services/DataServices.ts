import { useMutation } from "@tanstack/react-query";
import axios from 'axios';

const API_URL = 'https://app-membership-ded.onrender.com';

const API_KEY = "5172e400065503a482d22cbe4e5fb76870f883e1b6faa2fb2d8170773b559a35"

export const createMember = async (requestBody: any) => {

  return axios
    .post(`${API_URL}/create_member_website`, requestBody, {
      headers: {
          'access_token': API_KEY

      },
    })
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




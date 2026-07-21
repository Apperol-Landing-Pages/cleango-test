import axios from "axios";

import { getApiUrlDomain } from "@/api/config";

export const registration = async ({
  appsflyer_id,
}: { appsflyer_id?: string } = {}) => {
  const query = appsflyer_id
    ? `?appsflyer_id=${encodeURIComponent(appsflyer_id)}`
    : "";
  const apiUrl = `${getApiUrlDomain()}/auth/register${query}`;

  try {
    const response = await axios.post(
      apiUrl,
      {},
      {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      },
    );

    return response?.data;
  } catch (err) {
    return axios.isAxiosError(err) ? err.response?.data : undefined;
  }
};

export const login = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const apiUrl = `${getApiUrlDomain()}/auth/login`;

  try {
    const response = await axios.post(
      apiUrl,
      { login, password },
      {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (err) {
    return axios.isAxiosError(err) ? err.response?.data : undefined;
  }
};

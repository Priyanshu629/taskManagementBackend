
import axios from "axios"
import {config} from "dotenv"
config()

export const getOAuthToken = async (): Promise<string> => {
    try {
      const response = await axios.post(String(process.env.OAUTH_URL), null, {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          grant_type: 'client_credentials',
        },
      });
      let oauthToken = response.data.access_token;
      console.log('OAuth Token generated:', oauthToken);
      return oauthToken;
    } catch (error) {
      console.error('Error generating OAuth token:', error);
      throw new Error('Failed to generate OAuth token');
    }
  };
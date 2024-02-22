import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const userId = process.env.INSTAGRAM_USER_ID;

export async function fetchInstagramPosts() {
  try {
    const response = await axios.get(`https://graph.instagram.com/v12.0/${userId}/media?access_token=${accessToken}`);
    const posts = response.data.data;
    return posts;
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    throw error;
  }
}
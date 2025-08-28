import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import SHA256 from "crypto-js/sha256";


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { event_name, user_data, custom_data } = req.body;

    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.FACEBOOK_PIXEL_ID}/events?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`,
      {
        data: [
          {
            event_name,
            event_time: Math.floor(Date.now() / 1000),
            event_id: uuidv4(),
            user_data: {
  em: SHA256(user_data?.em || '').toString(),  // Hash the email securely
  client_ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
  client_user_agent: req.headers['user-agent'],
},
            custom_data,
            action_source: 'website',
          },
        ],
      }
    );

    return res.status(200).json({ message: 'Event sent', result: response.data });
  } catch (err) {
    console.error('Meta Pixel API error:', err.response?.data || err.message);
    return res.status(500).json({ error: 'Failed to send event' });
  }
}

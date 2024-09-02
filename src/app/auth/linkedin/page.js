import axios from "axios";

// LinkedIn OAuth configuration using environment variables
const clientId = process.env.LINKEDIN_CLIENT_ID;
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
const redirectUri = "http://localhost:3000/api/auth/linkedin/callback"; // Change to your production URL in production

export default async function handler(req, res) {
  const { query } = req;

  if (!query.code) {
    // Step 1: Redirect to LinkedIn for authentication
    const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=r_liteprofile%20r_emailaddress`;

    res.redirect(linkedinAuthUrl);
  } else {
    // Step 2: Exchange authorization code for access token
    const { code } = query;
    try {
      const tokenResponse = await axios.post(
        "https://www.linkedin.com/oauth/v2/accessToken",
        new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
          client_id: clientId,
          client_secret: clientSecret,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token } = tokenResponse.data;

      // Step 3: Use access token to fetch profile data
      const profileResponse = await axios.get(
        "https://api.linkedin.com/v2/me",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const emailResponse = await axios.get(
        "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      res.status(200).json({
        profile: profileResponse.data,
        email: emailResponse.data,
      });
    } catch (error) {
      console.error("Error fetching LinkedIn profile data:", error);
      res.status(500).json({ error: "Error fetching LinkedIn profile data" });
    }
  }
}

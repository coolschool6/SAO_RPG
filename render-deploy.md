# Deploying Your Online Game to Render

Render is a free cloud platform for hosting Node.js apps. Here’s how to deploy your game:

## Steps
1. Go to https://dashboard.render.com/ and sign up (free).
2. Click "New Web Service" and connect your GitHub repo (push your code to GitHub if not done).
3. Select your repo and set the following:
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Render will auto-detect the `PORT` environment variable and run your server.
5. After deployment, you’ll get a public URL (e.g., `https://your-app.onrender.com`).
6. Update your `client.html` to use the public WebSocket URL:
   ```js
   const ws = new WebSocket('wss://your-app.onrender.com');
   ```

## Notes
- Make sure your code is pushed to GitHub.
- You can now share your game with anyone online!

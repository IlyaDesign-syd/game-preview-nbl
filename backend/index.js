import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

// Helper variables for ES Module path resolution (replacement for CommonJS's __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dummy data (local DB for matches)
const NBL_MATCHES_DATA = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../nbl_matches.json"), "utf8")
);

const app = express();
const port = process.env.PORT || 3000;

// Use JSON middleware
app.use(express.json());

// Add CORS headers to allow the React frontend to fetch data locally/publicly
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Return all matches (upcoming + completed)
app.get("/matches", (req, res) => {
  console.log("--- ROUTE HIT: GET /matches --- Fetching all matches.");
  // In actual code, this would fetch data from the initialized NBL_DATA and DynamoDB/Firestore
  res.json(NBL_MATCHES_DATA);
});

// Get preview with matching ID, if it matches DB row - otherwise generate it with AI
app.get("/matches/:id/preview", (req, res) => {
  const matchId = req.params.id;
  console.log(
    `--- ROUTE HIT: GET /matches/${matchId}/preview --- Checking cache or generating preview.`
  );

  res.json({
    match_id: matchId,
    preview: "AI-generated preview stub for the specified match.",
    generated_at: new Date().toISOString(),
  });
});

// POST /matches/:id/rebuild - Regenerates a preview
app.post("/matches/:id/rebuild", (req, res) => {
  const matchId = req.params.id;
  console.log(
    `--- ROUTE HIT: POST /matches/${matchId}/rebuild --- Forcing regeneration.`
  );
  // In actual code, this logic calls getOrCreatePreview(matchId, true)
  res.json({
    match_id: matchId,
    status: "Preview regeneration successfully triggered.",
    version: 2, // Assuming we regenerated a new version
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
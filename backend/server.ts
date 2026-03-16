import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import fs from "fs";
import Groq from "groq-sdk";
import path from "path";
import https from "https";

type AiMode = "explain" | "refactor" | "naming";

const app = express();
const port = process.env.PORT || 3000;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

if (!process.env.GROQ_API_KEY) {
  console.warn("⚠️ GROQ_API_KEY is not set. AI endpoints will fail.");
}

app.use(cors());
app.use(express.json());

// Endpoint for keep-alive ping
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.get("/api/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.get("/api/tools", (req: Request, res: Response) => {
  try {
    const toolsPath = path.join(process.cwd(), "data", "tools.json");
    const raw = fs.readFileSync(toolsPath, "utf-8");
    const tools = JSON.parse(raw);
    res.json(tools);
    console.log("Tools loaded successfully", tools);
  } catch (err: unknown) {
    console.error("Failed to load tools", err);
    res.status(500).json({ message: "Failed to load tools" });
  }
});

function buildPrompt(params: {
  mode: AiMode;
  code: string;
  language?: string;
}): string {
  const { mode, code, language } = params;

  const langText = language ? `The code is mainly written in ${language}.` : "";

  if (mode === "explain") {
    return `
You are a senior frontend engineer and teacher.
${langText}

Explain clearly and briefly what this code does.
Focus on:
- overall purpose
- important edge cases
- potential bugs or smells

Return your answer in markdown.

CODE:
\`\`\`
${code}
\`\`\`
`;
  }

  if (mode === "refactor") {
    return `
You are a senior frontend engineer.
${langText}

Refactor and improve the following code.
Goals:
- improve readability
- reduce duplication
- keep the same behavior
- follow clean code best practices

Respond ONLY with the improved code block in the same language, nothing else.

ORIGINAL CODE:
\`\`\`
${code}
\`\`\`
`;
  }

  return `
You are a senior frontend engineer and naming expert.
${langText}

Suggest better names for functions, variables, and components in this code.
For each change, show:
- old name
- new name
- short reason

Then show an UPDATED VERSION of the code with the new names applied.

CODE:
\`\`\`
${code}
\`\`\`
`;
}

app.post("/api/ai/code-assistant", async (req: Request, res: Response) => {
  const { mode, code, language } = req.body as {
    mode?: AiMode;
    code?: string;
    language?: string;
  };

  if (!mode || !code) {
    return res.status(400).json({ message: "mode and code are required" });
  }

  if (!process.env.GROQ_API_KEY) {
    return res
      .status(500)
      .json({ message: "GROQ_API_KEY is not configured on the server" });
  }

  try {
    const prompt = buildPrompt({ mode, code, language });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are an expert frontend AI assistant. Always be concise and helpful, and follow the user's instructions exactly.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    });

    const content = completion.choices[0]?.message?.content ?? "";

    return res.json({ result: content });
  } catch (err) {
    console.error("Groq AI error", err);
    return res.status(500).json({ message: "AI request failed" });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Backend is running", time: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`🚀 Backend listening on http://localhost:${port}`);

  // Keep-alive hack for Render free tier
  const pingUrl = process.env.RENDER_EXTERNAL_URL || "https://dev-tools-hub.onrender.com";
  const interval = 14 * 60 * 1000; // 14 minutes

  console.log(`[KeepAlive] Target URL: ${pingUrl}/health`);

  const ping = () => {
    https.get(`${pingUrl}/health`, (res) => {
      console.log(`[KeepAlive] Ping status: ${res.statusCode} ${res.statusMessage}`);
    }).on('error', (err) => {
      console.log(`[KeepAlive] Ping failed: ${err.message}`);
    });
  };

  // Initial ping
  ping();

  setInterval(ping, interval);
});



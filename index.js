const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const date = Date.now();
const finalDate = new Date(date).toLocaleString();

const modules = [
  {
    input: /hallo|halo|hi|hay/i,
    output: "Halo apa kabar? ada yang bisa saya bantu?",
  },
  {
    input: /tanggal|berapa|sekarang|date/i,
    output: `Sekarang tanggal ${finalDate}`,
  },
];

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.post("/send", async (req, res) => {
  const userInput = req.body;

  for (let i = 0; i < modules.length; i++) {
    if (modules[i].input.test(userInput.userInput.toLowerCase())) {
      return res.send(modules[i].output);
    }
  }

  if (/^[0-9+-/%]*$/.test(userInput.userInput)) {
    const counting = eval(userInput.userInput);
    return res.send(
      `Hasil dari operasi matematika yang anda berikan adalah ${counting}`
    );
  } else {
    return res.send("Maaf saya tidak mengerti");
  }
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

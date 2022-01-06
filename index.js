import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const app = express();
const host = "0.0.0.0";
const port = process.env.PORT || 8081;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/add_problem", (req, res) => {
  res.status(200).type("text/plain");
  res.send("OK");

  const problem = req.body;

  try {
    bot.telegram.sendMessage(
      process.env.ADMIN_TELEGRAM_ID,
      `Новая проблема!\n\nОт: ${problem.user}\nПроблема: ${problem.problem}`
    );
  } catch (e) {
    console.log("ERROR BOT: " + e);
  }

  console.log(problem);
});

bot.launch();

app.listen(port, host, function () {
  console.log(`Bot listens http://${host}:${port} :: ${new Date()}`);
});

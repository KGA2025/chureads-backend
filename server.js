import express from "express";
import dotenv from "dotenv"; // 백엔드에서는 .env에 접근하기 위해서는 dotenv 필요
import { testTagGenerate } from "./services/tagService.js";

// 환경변수 로드
// 전역으로 로드해서 모든 node.js 모듈 내에서 접근 가능
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server at..", PORT);
  console.log("OpenAI API..", process.env.OPENAI_API_KEY);

  testTagGenerate();
});

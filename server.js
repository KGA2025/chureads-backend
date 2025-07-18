import express from "express";
import dotenv from "dotenv"; // 백엔드에서는 .env에 접근하기 위해서는 dotenv 필요
import postRouter, { init } from "./routes/posts.js";
import { connectDB } from "./database/db.js";
import cors from "cors";
import { handleSSEConnection } from "./sse/seeManager.js";

// 환경변수 로드
// 전역으로 로드해서 모든 node.js 모듈 내에서 접근 가능
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// CORS 설정 -- 순서 중요✨
app.use(cors()); // 모든 도메인 허용

// Json 파싱 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SSE 연결 라우트 : 프론트의 useSSE에서 해당 url(/events)로 연결 요청
app.get("/events", handleSSEConnection);

// 라우터 미들웨어 등록
app.use("/posts", postRouter); // 요청받는 api의 앞 부분이 posts인 경우

app.listen(PORT, async () => {
  console.log("Server at..", PORT);
  const db = await connectDB();
  init(db);
});

import express from "express";
import dotenv from "dotenv"; // 백엔드에서는 .env에 접근하기 위해서는 dotenv 필요
import { testTagGenerate } from "./services/tagService.js";
import postRouter from "./routes/posts.js";

// 환경변수 로드
// 전역으로 로드해서 모든 node.js 모듈 내에서 접근 가능
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Json 파싱 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우터 미들웨어 등록
app.use("/posts", postRouter); // 요청받는 api의 앞 부분이 posts인 경우

app.listen(PORT, () => {
  console.log("Server at..", PORT);
});

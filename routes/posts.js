import express from "express";

// 게시물 관련 모든 API 엔드포인트를 관리하는 라우터
const router = express.Router();

// GET /posts - 모든 게시물 조회
router.get("/", async (req, res) => {
  try {
    res.status(200).json({ message: "Get요청 성공했습니다" });
    console.log("Get요청 성공");
  } catch (error) {
    console.log(`Get요청 에러: ${error}`);
  }
});

export default router;

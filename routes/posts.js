import express from "express";
import { ObjectId } from "mongodb";
import { generateTags } from "./../services/tagService.js";

// 게시물 관련 모든 API 엔드포인트를 관리하는 라우터
const router = express.Router();

let collection;

export const init = (db) => {
  collection = db.collection("posts");
};

// GET /posts - 모든 게시물 조회
router.get("/", async (req, res) => {
  // 데이터베이스에서 모든 게시물을 가져와서 반환
  try {
    const posts = await collection.find().toArray();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
});

// GET /posts/:id - 특정 게시물 조회
router.get("/:id", async (req, res) => {
  // 데이터베이스에서 모든 게시물을 가져와서 반환
  const { id } = req.params;
  try {
    const posts = await collection.findOne({ _id: new ObjectId(id) });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
});

// POST /posts - 새 게시물 작성
router.post("/", async (req, res) => {
  // 요청 body에서 게시물 데이터를 받아서 데이터베이스에 저장
  try {
    const post = req.body;
    // GPT AI로 태그 생성
    const tags = await generateTags(post.content);

    // 데이터 추가
    const newItem = {
      ...post,
      likeCount: 0,
      likedUsers: [], //좋아요 한 UserID목록
      tags,
      createdAt: new Date(),
    };
    const result = await collection.insertOne(newItem);

    // TODO: 새 게시물 알림을 모든 클라이언트에게 전송
    res.status(201).json({ ...result, tags });
  } catch (error) {
    console.log(error);
  }
});

// PUT /posts/:id - 특정 게시물 수정
router.put("/:id", async (req, res) => {
  // URL 파라미터에서 게시물 ID를 받아서 해당 게시물을 수정
  try {
    const { id } = req.params;
    const post = req.body;
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { content: post.content, updatedAt: new Date() } } // 지정된 필드만 업데이트
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

// DELETE /posts/:id - 특정 게시물 삭제
router.delete("/:id", async (req, res) => {
  // URL 파라미터에서 게시물 ID를 받아서 해당 게시물을 삭제
  try {
    const { id } = req.params;
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

// PUT /posts/:id/like - 게시물 좋아요 토글
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await collection.findOne({ _id: new ObjectId(id) });
    if (!post) {
      return res.status(404).json({ error: "게시물을 찾을 수 없습니다" });
    }

    const result = await collection.updateOne({ _id: new ObjectId(id) });
  } catch (error) {}
});

export default router;

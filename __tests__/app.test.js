const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");
//const { get } = require("superagent");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/topics", () => {
  describe("GET", () => {
    test("status:200 and return an array of topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics).toBeInstanceOf(Array);
          expect(res.body.topics).toHaveLength(3);
          res.body.topics.forEach(topic => {
            expect(topic).toMatchObject({
              slug: expect.any(String),
              description: expect.any(String)
            });
          });
        });
    });
  });
});
describe("/api/articles", () => {
  describe("GET", () => {
    test("status:200 and return an array of articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles).toBeInstanceOf(Array);
          expect(res.body.articles).toHaveLength(12);
        });
    });
  });
  test("200:", () => {});
});

describe("/api/articles/:article_id", () => {
  describe("GET", () => {
    test("Return status: 200 and an article object for valid url", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then(res => {
          expect(res.body.article).toBeInstanceOf(Object);
          expect(res.body.article).toMatchObject({
            article_id: expect.any(Number),
            title: expect.any(String),
            body: expect.any(String),
            votes: expect.any(Number),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            comment_count: expect.any(String)
          });
        });
    });
    test("Return status: 400 and an error message for invalid id", () => {
      return request(app)
        .get("/api/articles/invalid_id")
        .expect(400)
        .then(res => {
          expect(res.body.msg).toBe("You entered an invalid id");
        });
    });
    test("Return status: 404 and error message for id that does not exists ", () => {
      return request(app)
        .get("/api/articles/1000")
        .expect(404)
        .then(res => {
          expect(res.body.msg).toBe("No article found with article_id: 1000");
        });
    });
  });

  describe("PATCH", () => {
    test("Return status: 200", () => {
      return request(app)
        .patch("/api/articles/3")
        .send({ inc_votes: 10 })
        .expect(200)
        .then(res => {
          let result = res.body.article;
          formattedResult = { article_id: result.article_id, votes: result.votes };
          expect(formattedResult).toEqual({
            article_id: 3,
            votes: 10
          });
        });
    });
    test("Return status: 400 and an error message for invalid id", () => {
      return request(app)
        .patch("/api/articles/invalid_id")
        .expect(400)
        .then(res => {
          expect(res.body.msg).toBe("You entered an invalid id");
        });
    });
    test("Return status: 404 and error message for id that does not exists ", () => {
      return request(app)
        .patch("/api/articles/200")
        .expect(404)
        .then(res => {
          expect(res.body.msg).toBe("No article found with article_id: 200");
        });
    });
  });
});
describe("/api/comments/:comment_id", () => {
  describe("DELETE", () => {
    test("Return status 204 if comment deleted", () => {
      return request(app).delete("/api/comments/1").expect(204);
    });

    test("Return status 404 and an error message", () => {
      return request(app)
        .delete("/api/comments/1000")
        .expect(404)
        .then(res => {
          expect(res.body.msg).toBe("Not Found");
        });
    });
  });
});

describe("Error handling for invalid url", () => {
  test("status:404 and return an error message", () => {
    return request(app)
      .get("/invalid_url")
      .expect(404)
      .then(res => {
        expect(res.body.msg).toBe("Can't find /invalid_url on this server!");
      });
  });
});

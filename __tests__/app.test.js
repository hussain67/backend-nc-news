const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET/ & GET/api", () => {
  test("Return status:200 and welcome mesage", () => {
    return request(app)
      .get("/")
      .expect(200)
      .then(res => {
        expect(res.body.msg).toBe("Welcome to the api");
      });
  });
  test("Return status:200 and api info", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(res => {
        //ssconsole.log(res.body);
        //expect(res.body.msg).toBe("Welcome to the api");
      });
  });
});
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
    test(" Return status:200 and return an array of articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles).toBeInstanceOf(Array);
          expect(res.body.articles).toHaveLength(12);
          res.body.articles.forEach(article => {
            expect(article).toMatchObject({
              article_id: expect.any(Number),
              title: expect.any(String),
              body: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              comment_count: expect.any(String)
            });
          });
        });
    });

    test("Return status: 200 and articles are sorted by passed query, descending order", () => {
      return request(app)
        .get("/api/articles?sort_by=article_id")
        .expect(200)
        .then(res => {
          expect(res.body.articles).toBeSortedBy("article_id", { descending: true });
        });
    });
    test("Return status: 200 and articles are sorted by passed query, ascending order", () => {
      return request(app)
        .get("/api/articles?sort_by=article_id&order_by=ASC")
        .expect(200)
        .then(res => {
          expect(res.body.articles).toBeSortedBy("article_id");
        });
    });
    test("Return status: 400 and an error message for invalid query", () => {
      return request(app)
        .get("/api/articles?sort_by=article_id&order_by=ASCC")
        .expect(400)
        .then(res => {
          expect(res.body.msg).toBe("Bad Request");
        });
    });

    test("Return status: 200 and topics for correct topic", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(res => {
          res.body.articles.forEach(el => {
            expect(el.topic).toBe("cats");
          });
        });
    });
    test("Return status: 400 and a error message for incorrect topic", () => {
      return request(app)
        .get("/api/articles?topic=nonExistant")
        .expect(400)
        .then(res => {
          expect(res.body.msg).toBe("Bad Request");
        });
    });
  });
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
          expect(res.body.msg).toBe("Bad Request");
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
          expect(res.body.msg).toBe("Bad Request");
        });
    });
    test("Return status: 404 and error message for id that does not exists ", () => {
      return request(app)
        .patch("/api/articles/700")
        .expect(404)
        .then(res => {
          expect(res.body.msg).toBe("No article found with article_id: 700");
        });
    });
  });
});
describe("/api/articles/:article_id/comments", () => {
  describe("GET", () => {
    test("Return status 200 and comments ", () => {
      return request(app)
        .get("/api/articles/3/comments")
        .expect(200)
        .then(res => {
          let arr = res.body.comments;
          expect(arr).toBeInstanceOf(Array);
          expect(arr).toHaveLength(2);
          arr.forEach(comment => {
            expect(comment).toMatchObject({
              comment_id: expect.any(Number),
              author: expect.any(String),
              article_id: expect.any(Number),
              created_at: expect.any(String),
              body: expect.any(String)
            });
          });
        });
    });
  });
  describe("POST", () => {
    test("Return status: 201 & created post", () => {
      return request(app)
        .post("/api/articles/9/comments")
        .send({
          username: "butter_bridge",
          body: "excellent"
        })
        .expect(201)
        .then(res => {
          let obj = res.body.post;
          expect(obj.author).toBe("butter_bridge");
          expect(obj.body).toBe("excellent");
          expect(obj.comment_id).toBe(19);
        });
    });
    test("MISSING FIELD, Return status: 400 & error message", () => {
      return request(app)
        .post("/api/articles/9/comments")
        .send({
          username: "butter_bridge"
        })
        .expect(400)
        .then(res => {
          expect(res.body.msg).toBe("Bad Request");
        });
    });
    test("INVALID FIELD, Return status: 400 & error message", () => {
      return request(app)
        .post("/api/articles/9/comments")
        .send({
          username_author: "butter_bridge"
        })
        .expect(400)
        .then(res => {
          expect(res.body.msg).toBe("Bad Request");
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

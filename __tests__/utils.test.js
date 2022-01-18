const { formatTopicData, formatUserData, formatArticleData, formatCommentData } = require("../utils/seed-formatting");

describe("formatTopicData", () => {
  test("Returns an empty array when passed an empty array", () => {
    expect(formatTopicData([])).toEqual([]);
  });
  test("Return nested array in the order of [slug, description]", () => {
    const testUserData = [
      {
        slug: "paper",
        description: "book"
      }
    ];
    const expectedResult = [["paper", "book"]];
    expect(formatTopicData(testUserData)).toEqual(expectedResult);
  });
  test("Return ary with multiple nested array in the right ordder", () => {
    const testUserData = [
      {
        slug: "paper",
        description: "book"
      },
      {
        slug: "pen",
        description: "wright"
      }
    ];
    const expectedResult = [
      ["paper", "book"],
      ["pen", "wright"]
    ];
    expect(formatTopicData(testUserData)).toEqual(expectedResult);
  });
});

describe("formatUserData", () => {
  test("Returns an empty array when passed an empty array", () => {
    expect(formatUserData([])).toEqual([]);
  });
  test("Return nested array in the order of [username, avatar_url, name]", () => {
    const testUserData = [
      {
        username: "mhussain",
        avatar_url: "https://avatar",
        name: "shahid"
      }
    ];
    const expectedResult = [["mhussain", "https://avatar", "shahid"]];
    expect(formatUserData(testUserData)).toEqual(expectedResult);
  });
  test("Return ary with multiple nested array in the right order", () => {
    const testUserData = [
      {
        username: "mhussain1",
        avatar_url: "https://avatar1",
        name: "shahid1"
      },
      {
        username: "mhussain2",
        avatar_url: "https://avatar2",
        name: "shahid2"
      }
    ];
    const expectedResult = [
      ["mhussain1", "https://avatar1", "shahid1"],
      ["mhussain2", "https://avatar2", "shahid2"]
    ];
    expect(formatUserData(testUserData)).toEqual(expectedResult);
  });
});
describe("formatArticleData", () => {
  test("Returns an empty array when passed an empty array", () => {
    expect(formatArticleData([])).toEqual([]);
  });
  test("Return nested array in the order of [title, body, votes, topic, author, created_at]", () => {
    const testUserData = [
      {
        title: "A",
        body: "body1",
        votes: 0,
        topic: "mitch1",
        author: "roger1",
        created_at: "16.12.2020"
      }
    ];
    const expectedResult = [["A", "body1", 0, "mitch1", "roger1", "16.12.2020"]];
    expect(formatArticleData(testUserData)).toEqual(expectedResult);
  });
  test("Return ary with multiple nested array in the right order", () => {
    const testUserData = [
      {
        title: "A",
        body: "body1",
        votes: 0,
        topic: "mitch1",
        author: "roger1",
        created_at: "16.12.2020"
      },
      {
        title: "B",
        body: "body2",
        votes: 10,
        topic: "mitch2",
        author: "roger2",
        created_at: "15.11.2020"
      }
    ];
    const expectedResult = [
      ["A", "body1", 0, "mitch1", "roger1", "16.12.2020"],
      ["B", "body2", 10, "mitch2", "roger2", "15.11.2020"]
    ];
    expect(formatArticleData(testUserData)).toEqual(expectedResult);
  });
});
describe("formatCommentData", () => {
  test("Returns an empty array when passed an empty array", () => {
    expect(formatCommentData([])).toEqual([]);
  });
  test("Return nested array in the order of [author, article_id, votes, created_at, body]", () => {
    const testUserData = [
      {
        author: "he",
        article_id: 1,
        votes: 5,
        created_at: "12.10.2020",
        body: "beautiful"
      }
    ];
    const expectedResult = [["he", 1, 5, "12.10.2020", "beautiful"]];
    expect(formatCommentData(testUserData)).toEqual(expectedResult);
  });
  test("Return ary with multiple nested array in the right order", () => {
    const testUserData = [
      {
        author: "he",
        article_id: 1,
        votes: 5,
        created_at: "12.10.2020",
        body: "beautiful"
      },
      {
        author: "she",
        article_id: 10,
        votes: 50,
        created_at: "11.10.2020",
        body: "bold"
      }
    ];
    const expectedResult = [
      ["he", 1, 5, "12.10.2020", "beautiful"],
      ["she", 10, 50, "11.10.2020", "bold"]
    ];
    expect(formatCommentData(testUserData)).toEqual(expectedResult);
  });
});

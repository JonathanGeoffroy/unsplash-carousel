import { rest } from "msw";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const handlers = [
  rest.get(SERVER_URL, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: "firstId", details: "/firstImage" },
        { id: "secondId", details: "/secondImage" },
      ])
    );
  }),

  rest.get("/firstImage", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: "firstId",
        url: "first-url",
        username: "first username",
        description: "first description",
        date: "2020-01-01T00:00:00.0",
        views: 1337,
        keywords: ["first", "key", "word"],
      })
    );
  }),

  rest.get("/secondImage", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: "secondId",
        url: "second-url",
        username: "second username",
        description: "second description",
        date: "2020-01-01T00:00:00.0",
        views: 1337,
        keywords: ["second", "key", "word"],
      })
    );
  }),
];

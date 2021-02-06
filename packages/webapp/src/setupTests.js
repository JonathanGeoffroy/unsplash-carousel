// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { handlers } from "../mocks/handlers";

// Force default locale to "en-US"
const toLocaleString = Date.prototype.toLocaleDateString;
Date.prototype.toLocaleDateString = function (locale = "en-US", ...args) {
  return toLocaleString.call(this, locale, ...args);
};

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

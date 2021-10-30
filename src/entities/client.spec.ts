import fetch from "cross-fetch";

import { APIClient } from "./client";
import { todoItemFactory } from "../__testUtils/testUtils";
import { TodoItem } from "../interfaces/interface";

jest.mock("cross-fetch");

describe("APIClient", () => {
  describe("Fetch Calls", () => {
    let apiClient: APIClient;
    let mockFetch: jest.MockedFunction<any>;
    let json: jest.MockedFunction<any>;

    beforeEach(() => {
      apiClient = new APIClient();
      mockFetch = fetch as jest.MockedFunction<typeof fetch>;
      json = jest.fn() as jest.MockedFunction<any>;
    });

    afterEach(() => {
      mockFetch.mockReset();
      json.mockReset();
    });

    test("Makes the correct call to remote", (done) => {
      const todoItems = todoItemFactory(3);
      json.mockResolvedValue(todoItems);
      mockFetch.mockResolvedValue({ json } as Response);
      apiClient.getTodos().then(() => {
        expect(mockFetch.mock.calls.length).toBe(1);

        //First call to contain
        expect(mockFetch.mock.calls[0]).toContain(
          "https://jsonplaceholder.typicode.com/todos"
        );
        done();
      });
    });

    test("Returns the correct data from remote", (done) => {
      const todoItems: TodoItem[] = todoItemFactory(3);
      json.mockResolvedValue(todoItems);
      mockFetch.mockResolvedValue({ json } as Response);
      apiClient.getTodos().then((data) => {
        expect(mockFetch.mock.calls.length).toBe(1);
        expect(data).toEqual(todoItems);
        done();
      });
    });

    test("Handles rejections gracefully", (done) => {
      mockFetch.mockRejectedValueOnce(new Error("Opps"));
      apiClient.getTodos().then((data) => {
        expect(mockFetch.mock.calls.length).toBe(1);
        expect(data).toEqual([]);
        done();
      });
    });
  });
});

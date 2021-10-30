import { todoContainer } from "./config/inversify.config";
import { Client, Manager, TodoItem } from "./interfaces/interface";
import { TYPES } from "./constants/types";
import { todoItemFactory } from "./__testUtils/testUtils";

// More or less copied from:
// https://github.com/inversify/InversifyJS/blob/2806aa9908dca34c69504db6f4882ba780b1b2d2/wiki/container_snapshots.md
describe("todoContainer", () => {
  beforeEach(() => {
    todoContainer.snapshot();
  });

  afterEach(() => {
    todoContainer.restore();
  });

  it("Correctly binds and gets client and manager", () => {
    const apiManager = todoContainer.get<Manager>(TYPES.ApiManager);
    const todoClient = todoContainer.get<Manager>(TYPES.TodoClient);
    expect(apiManager).toBeTruthy();
    expect(todoClient).toBeTruthy();
  });

  it("Correctly uses the injected mock", async () => {
    const todoClientMock: Client = {
      getTodos: (): Promise<TodoItem[]> => {
        // I have been called, so pass test
        expect(true).toBeTruthy();
        return Promise.resolve([]);
      },
    };

    todoContainer.unbind(TYPES.TodoClient);
    todoContainer
      .bind<Client>(TYPES.TodoClient)
      .toConstantValue(todoClientMock);
    const apiManager = todoContainer.get<Manager>(TYPES.ApiManager);
    await apiManager.fetchData();
  });

  it("Correctly uses the injected mock's return values", async () => {
    const todoItems = todoItemFactory(2);
    const todoClientMock: Client = {
      getTodos: (): Promise<TodoItem[]> => {
        return Promise.resolve(todoItems);
      },
    };

    todoContainer.unbind(TYPES.TodoClient);
    todoContainer
      .bind<Client>(TYPES.TodoClient)
      .toConstantValue(todoClientMock);
    const apiManager = todoContainer.get<Manager>(TYPES.ApiManager);
    const returnData = await apiManager.fetchData();

    expect(returnData).toEqual(todoItems);
  });
});

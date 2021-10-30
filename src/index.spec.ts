import { TodoManagerModule, APIClientModule } from "./entities";
import { Container } from "inversify";
import { TYPES } from "./constants/types";
import { Manager } from "./interfaces/interface";

describe("todoContainer", () => {
  describe("ApiManager", () => {
    let container: Container;

    beforeEach(() => {
      container = new Container();
      container.load(TodoManagerModule, APIClientModule);
    });

    test("Client is injectable", () => {
      const injectableClient = container.get(TYPES.TodoClient);
      expect(injectableClient).toBeDefined();
    });

    test("Client is injected correctly", (done) => {
      container.rebind(TYPES.TodoClient).toDynamicValue(() => ({
        getTodos: (): void => {
          // Will T/O if never called
          expect(true).toBeTruthy();
          done();
        },
      }));

      const apiManager: Manager = container.get(TYPES.ApiManager);
      apiManager.fetchData();
    });
  });
});

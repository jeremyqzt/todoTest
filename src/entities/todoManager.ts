import { injectable, ContainerModule, inject, interfaces } from "inversify";
import { Client, TodoItem, Manager } from "../interfaces/interface";
import { TYPES } from "../constants/types";

@injectable()
class TodoManager implements Manager {
  private _client: Client;

  public constructor(@inject(TYPES.TodoClient) todoClient: Client) {
    this._client = todoClient;
  }

  public fetchData(): Promise<TodoItem[]> {
    return this._client.getTodos();
  }
}

const TodoManagerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<Manager>(TYPES.ApiManager).to(TodoManager);
});

export { TodoManager, TodoManagerModule };

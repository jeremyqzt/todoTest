import "reflect-metadata";

import fetch from "cross-fetch";

import { injectable, ContainerModule, interfaces } from "inversify";
import { Client, TodoItem } from "../interfaces/interface";
import { TYPES } from "../constants/types";

@injectable()
class APIClient implements Client {
  public getTodos(): Promise<TodoItem[]> {
    return fetch("https://jsonplaceholder.typicode.com/todos").then((resp) =>
      resp.json()
    ) as any as Promise<TodoItem[]>;
  }
}

const APIClientModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<Client>(TYPES.TodoClient).to(APIClient);
});

export { APIClient, APIClientModule };

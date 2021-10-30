import "reflect-metadata";

import fetch from "cross-fetch";

import { injectable } from "inversify";
import { Client, TodoItem } from "../interfaces/interface";

@injectable()
class APIClient implements Client {
  remoteUrl = "https://jsonplaceholder.typicode.com/todos";

  public getTodos(): Promise<TodoItem[]> {
    return (
      fetch(this.remoteUrl)
        .then((resp) => resp.json())
        // catch case, should agree on something nicer than []
        .catch(() => []) as any as Promise<TodoItem[]>
    );
  }
}

export { APIClient };

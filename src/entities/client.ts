import "reflect-metadata";

import { injectable } from "inversify";
import { Client, TodoItem } from "../interfaces/interface";

@injectable()
class APIClient implements Client{

    public getTodos(): Promise<TodoItem[]> {
        return fetch("https://jsonplaceholder.typicode.com/todos")
        .then(resp => resp.json());
    }
}

export { APIClient };
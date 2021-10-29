import { TodoManager, APIClient } from "../entities";

import { Container } from "inversify";
import { TYPES } from "../constants/types";
import { Manager, Client } from "../interfaces/interface";

const myContainer = new Container();
myContainer.bind<Manager>(TYPES.ApiManager).to(TodoManager);
myContainer.bind<Client>(TYPES.TodoClient).to(APIClient);

export { myContainer };
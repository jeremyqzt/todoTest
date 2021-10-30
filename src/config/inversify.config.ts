import { TodoManager, APIClient } from "../entities";

import { Container } from "inversify";
import { TYPES } from "../constants/types";
import { Manager, Client } from "../interfaces/interface";

const todoContainer = new Container();
todoContainer.bind<Manager>(TYPES.ApiManager).to(TodoManager);
todoContainer.bind<Client>(TYPES.TodoClient).to(APIClient);

export { todoContainer };

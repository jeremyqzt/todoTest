import { todoContainer } from "./config/inversify.config";
import { TYPES } from "./constants/types";
import { Manager } from "./interfaces/interface";

const apiManager = todoContainer.get<Manager>(TYPES.ApiManager);

export default apiManager;

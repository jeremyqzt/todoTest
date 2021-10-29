export interface TodoItem {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface Client {
    getTodos(): Promise<TodoItem[]>;
}

export interface Manager {
    fetchData(): Promise<TodoItem[]>;
}

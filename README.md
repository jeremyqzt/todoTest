# Api Manager and Todo Client

This is a simple implementation of a `TodoClient` and an `APIManager`

The client always fetches from `https://jsonplaceholder.typicode.com/todos` and returns the list of todo items, on errors, it will return a empty array (But that should probably be changed).

The client is injected into the manager using `inversifyJS`.

# Using This Package

This is a stub package and doesn't do anything yet. unit tests can be ran after installing dev/runtime dependencies.

```
npm install
npm test
```

This package can also be build into `js` by running

```
npm run build
```

The resulting `apiManager` is exported by `./build/index.js`.

The `apiManager` implements following interface

```
interface  Manager {
	fetchData(): Promise<TodoItem[]>;
}
```

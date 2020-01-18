**NOTE: I am not in love with the current folder structure, but it is good enough to prove a point.**

The purpose of this project is to exemplify a lazy loaded state implementation. Also leverages dependency injection pattern to allow building a store whose implementation is mostly sharable between environments (web, node, and react-native).

## Lazy load state details

In this todo app, the source code for mobx, mobx-react, or `TodosStore`, is **not requested until the user sees the initial page load**. Fake a slow connection to more easily see this in your network tools.
This will allow us to quickly show an application shell, even with poor connectivity, since **the bandwith used to get to the first browser paint is significantly less than typical store setups**.

`useTodosStore()` is a hook that accesses the `CoreStore` passed down through `CoreStoreProvider`'s context.  
Then, it checks CoreStore's `LazyStoreRegistry` for an existing `TodosStore` instance.  
If one does not exist, it creates a new instance and saves it to that store registry.

Because the `LazyStoreRegistry` is easily accessible through the `CoreStore` context, this means any other lazy loaded store that is injected into the registry will have access to that same instance of the `TodosStore`.

This pattern is very powerful - it allows lazy loaded _and_ non lazy loaded stores to easily communicate with each other, without having to declare them as part of a singleton on app start, which is a common pattern that does not scale well in terms of application load times.

## Dependency injection based store details

There is a `CoreStore` that depends on a few other stores as dependencies. Some stores have sharable implementations (such as `AuthStore`), while others require a specific implementation for their platform (example, `WebSessionStorage`).

This dependency injection pattern gives us maximum state code shareability (since we do not have to re-declare stores whose implementation is platform agnostic), and huge unit testability gains, since one can easily "swap" out a store for a mock store, to mimic a scenario like request failure, network communication issues, permissions issues, etc. Basically, anything pertaining state or side effects can be easily mocked.

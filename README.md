# `tsfy` — TypeScript for You

A collection of useful type-safe helpers for typescript projects!

## Types

- `Option<T>`: Optionals, based on the Rust interface
- `Result<T>`: Results, based on the Rust interface
- `Cache<T>`: Generic caching implementations
- `Pipe<T>`: Eager, lazy, and asynchronous pipes
- `__phantom__`: Phantom data marker

## Functions

- `resultify` and `resultifyAsync`: Convert error-throwing code to use Results
- `extend`: Well-typed wrapper around `Object.create`
- `toUnknown` and `toUnknownList`: Cast to unknown
- `unreachable`: Indicate unreachable code

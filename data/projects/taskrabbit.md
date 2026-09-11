# TaskRabbit — Two-Sided Marketplace

## Challenge

A two-sided marketplace must keep customer, provider, messaging, and transaction concerns coherent without turning every product change into a system-wide change. Multiple roles have different goals and state transitions.

## Architecture and implementation

- Organize interface and service boundaries around marketplace responsibilities and user intent.
- Prefer stable domain responsibilities over route-specific duplication.
- Represent pending, confirmed, unavailable, and retryable asynchronous outcomes explicitly.
- Deliver changes incrementally so new behavior can coexist with established workflows.

## Impact

Tito contributed to scalable marketplace experiences connecting customers with local service providers. Marketplace responsibilities could evolve with clearer separation between user journeys and underlying services. Internal marketplace metrics are not disclosed.

## Technology

React, Ruby on Rails, PostgreSQL, Redis, and AWS.

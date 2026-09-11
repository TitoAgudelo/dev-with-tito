# Gametime — Mobile Ticketing

## Challenge

A time-sensitive marketplace must present changing inventory, pricing, and purchase state without making the customer carry the system's complexity. Mobile networks and device conditions make partial failure a normal operating condition.

## Architecture and implementation

- Model transitional and terminal purchase states explicitly instead of relying on ambiguous optimistic feedback.
- Align component boundaries to product states rather than screen-shaped abstractions.
- Use typed service contracts and defensive handling for stale or unavailable inventory.
- Prioritize discovery-to-purchase responsiveness and defer nonessential client work.

## Impact

Tito contributed to a clearer, more resilient mobile purchase experience for last-minute event discovery and checkout. Purchase state and recovery paths remained understandable during time-sensitive interactions. Internal conversion and traffic metrics are confidential.

## Technology

React Native, TypeScript, Node.js, Python, and AWS.

# Fanatics — Peak-Demand Commerce

## Challenge

Demand can rise sharply around games and releases, putting the most valuable customer paths under the greatest technical pressure. Inventory and personalization cross multiple service boundaries, and customer experience must degrade predictably when a dependency is slow or unavailable.

## Architecture and implementation

- Protect the primary commerce journey with clear data ownership, bounded client work, and explicit dependency states.
- Isolate loading and recovery boundaries so a slow secondary dependency does not erase the entire experience.
- Coordinate frontend and service changes through versioned contracts and focused release validation.
- Evaluate JavaScript and data cost against its value to the conversion path.

## Impact

Tito supported dependable customer-facing commerce flows across major sports properties and high-attention moments. Critical journeys were treated as isolated and observable rather than as one all-or-nothing page. Traffic and commercial metrics remain confidential.

## Technology

React, TypeScript, Node.js, microservices, AWS, and Kubernetes.

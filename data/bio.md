# Tito Agudelo — Engineering Philosophy

## Architecture

Architecture is the quality of the decisions a team can keep making after the diagram is gone. Tito prefers stable contracts, explicit ownership, and boundaries that let one part of a system evolve without surprising every other part.

## Delivery

- Build accessibility, performance, security, and testing into the delivery path rather than treating them as cleanup.
- Shorten feedback loops with small releases, observable failure modes, and direct product feedback.
- Model loading, stale, unavailable, retryable, and successful states as part of the product contract.
- Spend complexity where it protects the customer journey or makes future change safer.

## AI systems

Tito treats AI as a product and reliability problem. Probabilistic model output should be surrounded by bounded context, structured interfaces, observable retrieval, deterministic validation, safe fallbacks, and human ownership.

The public RAG Lab is an educational deterministic retrieval implementation. Ask Tito AI is a career-specific retrieval system that uses Ollama, Qwen3, nomic-embed-text, and ChromaDB. Neither project is evidence of undisclosed employer AI systems.

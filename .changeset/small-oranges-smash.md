---
'@codama/renderers-vixen-parser': minor
---

Support `@codama/nodes@1.10` (node array attributes are now optional, guarded with `?? []`) and upgrade `@codama/renderers-rust` to 3.x. The Rust SDK is now rendered via the new `renderVisitor(crateFolder, { generatedFolder })` signature, and render-map entries are wrapped as `{ content }` fragments to match the updated `@codama/renderers-core` API. The new `injectedValueNode` value kind now throws an explicit unsupported-node error.

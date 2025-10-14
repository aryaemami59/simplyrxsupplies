/**
 * Infers a React component name from an {@linkcode Error} stack trace.
 * Parses V8-style frames and returns the frame above React’s
 * `react_stack_bottom_frame` marker. Falls back to `"Component"`
 * when the stack is unavailable or the marker cannot be found.
 *
 * @returns The inferred component name, or `"Component"` if unknown.
 *
 * @example
 * <caption>Use inside a render logger</caption>
 *
 * ```tsx
 * import { inferComponentNameFromStack } from "../../utils/inferComponentNameFromStack.js";
 *
 * const componentName = inferComponentNameFromStack();
 * console.log(`[${componentName}] re-rendered`);
 * ```
 */
export const inferComponentNameFromStack = (): string => {
  const { stack } = new Error()

  if (!stack) {
    return "Component"
  }

  const frames = stack
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.startsWith("at"))

  const markerIndex = frames.findIndex(frame =>
    frame.includes("react_stack_bottom_frame"),
  )

  if (markerIndex < 1) {
    return "Component"
  }

  const candidate = frames[markerIndex - 1]

  const componentName = candidate?.split(" ").at(-2) ?? "Component"

  return componentName
}

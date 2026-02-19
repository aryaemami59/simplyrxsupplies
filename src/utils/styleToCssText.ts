import type { PropertiesHyphen } from "csstype"
import type { Simplify } from "../types/tsHelpers.js"

/**
 * Converts a hyphen-case CSS style object into a single inline style string.
 * Useful for generating values for the HTML `style` attribute or `%c` console
 * styling. Keys are expected to be hyphenated (e.g., `"font-weight"`,
 * `"background-color"`), and values are coerced to strings via
 * {@linkcode String.toString | .toString()}.
 *
 * @param style - A CSS properties object in hyphen-case (e.g., from `csstype`'s {@linkcode PropertiesHyphen}).
 * @returns A space-separated string of `key: value;` pairs suitable for inline CSS.
 *
 * @example
 * <caption>For console styling with `%c`</caption>
 *
 * ```tsx
 * import { styleToCssText } from "../../utils/styleToCssText.js";
 *
 * console.log(
 *   "%cHello, world!",
 *   styleToCssText({ color: "violet", "font-weight": 600 })
 * );
 * ```
 *
 * @example
 * <caption>For an element’s `style` attribute</caption>
 *
 * ```tsx
 * import { styleToCssText } from "../../utils/styleToCssText.js";
 *
 * const css = styleToCssText({
 *   "background-color": "#111",
 *   color: "#fff",
 *   "font-size": "14px",
 * });
 * // => 'background-color: #111; color: #fff; font-size: 14px;'
 * element.setAttribute("style", css);
 * ```
 */
export const styleToCssText = (style: Simplify<PropertiesHyphen>): string =>
  Object.entries(style)
    .map(([key, value = ""]) => `${key}: ${value.toString()};` as const)
    .join(" ")

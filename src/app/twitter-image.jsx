// Reuse the Open Graph image for Twitter/X cards.
// `runtime` must be declared literally here so Next can statically detect it.
import OpengraphImage, { alt, size, contentType } from "./opengraph-image";

export const runtime = "edge";
export { alt, size, contentType };
export default OpengraphImage;

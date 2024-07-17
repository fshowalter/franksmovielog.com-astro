import { join } from "path";

export function getContentPath(
  kind: "data" | "reviews" | "viewings" | "pages",
  path?: string,
) {
  if (path) {
    return join(process.cwd(), "content", kind, path);
  }

  return join(process.cwd(), "content", kind);
}

const regex = new RegExp(/(?<=_image\?)(.*?)(?=content)/gm);

export function normalizeSnapshot(html: string): string {
  return html.replace(regex, "/");
}

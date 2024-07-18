const regex = new RegExp(/(?<=_image\?)(.*?)(?=content)/gm);

export function normalizeDevImageSrcs(html: string): string {
  return html.replace(regex, "/");
}

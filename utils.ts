export const extensions = ["", ".json", ".png", ".jpg"];

export const findExtension = (url: string) => {
  for (const extension of extensions.slice(1, extensions.length)) {
    if (url.includes(extension)) return [""];
  }
  return extensions;
};

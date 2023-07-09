// とりあえずwindowsだけ判別
export const OS_LIST = {
  windows: "windows",
  mac: "mac",
} as const;

export type OS = keyof typeof OS_LIST;

export const OS_KEY: { [key in OS]: string } = {
  windows: "Ctrl",
  mac: "⌘",
};

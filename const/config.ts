export const CONFIG = {
  diff: {
    easy: "カタカナだと入力欄にサジェストが出ます",
    normal: "入力欄にサジェストが出ません",
    hard: 'CPUは可能な限り"ン"で終わらせません',
  },
  spaceBasis: 50,
  requestLimit: {
    expired: 1 * 60 * 60 * 1000, // mill sec
    requestCount: 1000, // per {expired}
    maxUserCount: 1000, // per {expired}
  },
  rankLimit: 5,
  cookie: {
    maxAge: 60 * 60 * 24,
  },
  timeLimit: 30 * 1000,
  defaultNickname: "unown",
} as const;

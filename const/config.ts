export const CONFIG = {
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
  timeLimitMillS: 30 * 1000,
  score: {
    defaultNickname: "unown",
    nicknameMaxLen: 10,
    scoreMax: 1000 * 1000,
  },
  revalidate: {
    api: 1 * 60 * 60,
  },
  pcMinWidth: 700,
} as const;

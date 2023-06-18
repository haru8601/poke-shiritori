type History = {
  version: string;
  content: string;
  created_at: string; // YYYYMMDD
};

export const HISTORIES: readonly History[] = [
  {
    version: "1.0.0",
    content: "サービス開始",
    created_at: "20230226",
  },
  {
    version: "1.1.0",
    content: "変更履歴タブ表示、ランキングのリロードボタン追加",
    created_at: "20230619",
  },
] as const;

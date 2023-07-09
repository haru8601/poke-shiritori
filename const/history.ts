export type History = {
  version: string;
  content: string;
  createdAt: string; // YYYYMMDD
  rankReset?: boolean;
};

export const HISTORIES: History[] = [
  {
    version: "1.0.0",
    content: "サービス開始",
    createdAt: "20230226",
    rankReset: true,
  },
  {
    version: "1.1.0",
    content: "変更履歴タブ表示、ランキングのリロードボタン追加",
    createdAt: "20230619",
  },
  {
    version: "1.2.0",
    content: "月間ランキングを追加",
    createdAt: "20230623",
  },
  {
    version: "2.0.0",
    content: "スコア計算一部修正",
    createdAt: "20230709",
    rankReset: true,
  },
];

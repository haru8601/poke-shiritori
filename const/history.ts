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
  {
    version: "2.0.1",
    content: "SV碧の仮面ポケモン対応",
    createdAt: "20230918",
  },
  {
    version: "2.1.0",
    content: "終了時に候補表示",
    createdAt: "20231009",
  },
  {
    version: "2.1.1",
    content: "ランキング保存時の不具合修正",
    createdAt: "20231021",
  },
  {
    version: "2.1.2",
    content: "SV藍の円盤ポケモン対応",
    createdAt: "20231221",
  },
  {
    version: "3.0.0",
    content: "スキップ機能追加",
    createdAt: "20240501",
    rankReset: true,
  },
  {
    version: "3.0.1",
    content: "旧ランキングをバージョンごとに分けて表示",
    createdAt: "20240517",
  },
  {
    version: "3.0.2",
    content: "ショートカット周りの不具合修正",
    createdAt: "20250215",
  },
];

import { FC, useEffect } from "react";
import { AdmaxAdType } from "@/types/Admax";

// PC/SP切替広告のReactコンポーネント
export const Admax: FC<{ id: string }> = (props) => {
  useEffect(() => {
    // windowオブジェクトの広告リストを初期化
    if (!window["admaxads"]) window["admaxads"] = [];
    // 広告リストを取得
    const admaxads: AdmaxAdType[] = window["admaxads"];
    // 広告リストになかったら追加
    if (!admaxads.some((ad) => ad.admax_id === props.id))
      admaxads.push({
        admax_id: props.id,
        type: "switch",
      });
    // 外部JSを読み込んで広告リストを実際に表示
    const tag = document.createElement("script");
    tag.src = "https://adm.shinobi.jp/st/t.js";
    tag.async = true;
    document.body.appendChild(tag);
    // アンマウント時にJSタグと広告情報を削除
    return () => {
      document.body.removeChild(tag);
      admaxads.splice(
        admaxads.findIndex((ad) => ad.admax_id === props.id),
        1
      );
      window["__admax_tag__"] = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="admax-switch"
      data-admax-id={props.id}
      style={{ display: "inline-block" }}
    />
  );
};

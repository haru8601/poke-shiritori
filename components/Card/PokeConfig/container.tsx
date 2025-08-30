import {
  ComponentProps,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { getOldRanking } from "@/actions/ranking/getOldRanking";
import { TEXT } from "@/const/text";
import { addDummy } from "@/utils/addDummy";
import { convertToRankNode } from "@/utils/convertToRankNode";
import { getLatestMajorVersion } from "@/utils/version/getLatestMajorVersion";
import PokeConfigPresenter from "./presenter";
import PokeHeaderPresenter from "../PokeHeader/presenter";

type Props = Pick<
  ComponentProps<typeof PokeHeaderPresenter>,
  | "monthScoreAll"
  | "totalScoreAll"
  | "innerWidth"
  | "onPlayAudio"
  | "onReloadRanking"
>;

export default function PokeConfig({
  monthScoreAll,
  totalScoreAll,
  innerWidth,
  onPlayAudio,
  onReloadRanking,
}: Props) {
  const [showSide, setShowSide] = useState<boolean>(false);
  const [rankRowAll, setRankRowAll] = useState<ReactNode>(TEXT.loading);
  const [monthRankRowAll, setMonthRankRowAll] = useState<ReactNode>(
    TEXT.loading
  );
  const [oldRankRowAll, setOldRankRowAll] = useState<ReactNode>(TEXT.loading);

  const [oldVersion, setOldVersion] = useState<number>(1);

  const [versionList, setVersionList] = useState<number[]>([]);

  useEffect(() => {
    const latestVersion = getLatestMajorVersion();

    const initOldVersion = latestVersion - 1;

    setOldVersion(initOldVersion);

    // 最新バージョン以外の数字
    // ex. 最新が3.1.0なら[1,2]
    const indexList = [...Array(initOldVersion)].map((_, index) => index + 1);
    setVersionList(indexList);
  }, []);

  // スコアが変わるたびにランキングを更新
  useEffect(() => {
    // scoreが取得されてなければランキングも表示しない
    if (totalScoreAll.length) {
      const tmpScoreAll = addDummy(totalScoreAll);
      // 総合ランキング
      setRankRowAll(convertToRankNode(tmpScoreAll, true));

      const tmpMonthScoreAll = addDummy(monthScoreAll);
      // 月間ランキング
      setMonthRankRowAll(convertToRankNode(tmpMonthScoreAll, true));

      (async () => {
        // (キャッシュがなければ)DBから取得
        const oldRanking = await getOldRanking(
          versionList[versionList.length - 1].toString()
        );
        // 旧バージョンランキング
        setOldRankRowAll(convertToRankNode(oldRanking, false));
      })();
    }
  }, [monthScoreAll, versionList, totalScoreAll]);

  const handleOpenSide = () => {
    setShowSide(true);
  };
  const handleCloseSide = () => {
    setShowSide(false);
  };

  const handleReloadRanking = () => {
    /* 一旦ランキングを初期化(更新がUI上でもわかるように) */
    setRankRowAll(TEXT.reloading);
    setMonthRankRowAll(TEXT.reloading);
    setOldRankRowAll(TEXT.reloading);
    onReloadRanking();
  };

  const handleSwitchVersion = async (
    eventKey: string | null,
    _: SyntheticEvent<unknown>
  ) => {
    setOldVersion(parseInt(eventKey ?? ""));
    // (キャッシュがなければ)DBから取得
    const oldRanking = await getOldRanking(eventKey ?? "");
    // 旧バージョンランキング
    setOldRankRowAll(convertToRankNode(oldRanking, false));
  };

  return (
    <PokeConfigPresenter
      showSide={showSide}
      rankRowAll={rankRowAll}
      monthRankRowAll={monthRankRowAll}
      oldRankRowAll={oldRankRowAll}
      version={oldVersion}
      versionList={versionList}
      innerWidth={innerWidth}
      onOpenSide={handleOpenSide}
      onCloseSide={handleCloseSide}
      onPlayAudio={onPlayAudio}
      onReloadRanking={handleReloadRanking}
      onSwitchVersion={handleSwitchVersion}
    />
  );
}

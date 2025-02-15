import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  ChangeEvent,
  ComponentProps,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import setRanking from "@/actions/ranking/setRanking";
import styles from "@/app/styles/Top.module.css";
import TopPresenter from "@/components/Top/presenter";
import { CONFIG } from "@/const/config";
import { COOKIE_NAMES, COOKIE_VALUES } from "@/const/cookie";
import { GAME_STATUS } from "@/const/gameStatus";
import { usePokeApi } from "@/hook/usePokeApi";
import { PokeMap } from "@/types/Poke";
import { Score } from "@/types/Score";
import { getMonthScoreAll } from "@/utils/getMonthScoreAll";
import { getMyIndex } from "@/utils/getMyIndex";
import { getShiritoriWord } from "@/utils/getShiritoriWord";
import getCandidates from "@/utils/shiritori/getCandidates";
import getNewestPoke from "@/utils/shiritori/getNewestPoke";
import PokeFinishModalPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  | "pokeMap"
  | "firstPoke"
  | "gameStatus"
  | "score"
  | "scoreAll"
  | "os"
  | "innerWidth"
>;

export default function PokeFinishModal({
  pokeMap,
  firstPoke,
  gameStatus,
  score,
  scoreAll,
  os,
}: Props) {
  const [showModal, setShowModal] = useState<boolean>(true);
  // リスナーで使用
  const showRef = useRef<boolean>(true);
  showRef.current = showModal;

  // ランキング送信を許可
  const [allowSubmit, setAllowSubmit] = useState<boolean>(false);
  const allowSubmitRef = useRef<boolean>(false);
  allowSubmitRef.current = allowSubmit;
  // cookieが空の場合はnull表記
  const [nickname, setNickname] = useState<string | null>(
    // キーをcookieのキー名としている
    (parseCookies() as typeof COOKIE_NAMES).shiritori_nickname
  );
  const nicknameRef = useRef<string | null>(null);
  nicknameRef.current = nickname;
  const [nicknameErr, setNicknameErr] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [monthRankRowAll, setMonthRankRowAll] = useState<ReactNode>();
  const [myIndex, setMyIndex] = useState<number>(-1);
  const [myMonthIndex, setMyMonthIndex] = useState<number>(-1);
  const [candidateMap, setCandidateMap] = useState<PokeMap>({});
  const [previousBestScore, _] = useState<number>(
    parseInt(parseCookies(null)[COOKIE_NAMES.score_best]) || 0
  );
  const [isBestScore, setIsBestScore] = useState<boolean>(false);
  const { setPokeImg } = usePokeApi();

  useEffect(() => {
    if (!previousBestScore || previousBestScore <= score) {
      setCookie(null, COOKIE_NAMES.score_best, score.toString(), CONFIG.cookie);
      setIsBestScore(true);
    }

    if (!scoreAll.length) {
      /* ランキングが取得できてなければ順位計算しない */
      setMonthRankRowAll("ランキングを取得できませんでした");
    } else {
      // 順位計算
      setMyIndex(getMyIndex(score, scoreAll));

      // 月間順位
      const monthScoreAll = getMonthScoreAll(scoreAll);
      setMyMonthIndex(getMyIndex(score, monthScoreAll));

      // 表示するランキング生成
      setMonthRankRowAll(
        monthScoreAll
          .concat({
            id: -1,
            user: nickname || CONFIG.score.defaultNickname,
            score: score,
          })
          .sort((a, b) => {
            const scoreDiff: number = b.score - a.score;
            /* 2つ目で新規のスコアが既存の以上ならswap */
            if (b.id == -1 && scoreDiff > 0) {
              return 1;
            }
            /* 1つ目が新規で既存のスコアと同じならswapさせない */
            if (a.id == -1 && scoreDiff <= 0) {
              return -1;
            }
            return scoreDiff;
          })
          .slice(0, CONFIG.topRankLimit)
          .map((score: Score, index) => {
            return (
              <tr
                key={index}
                className={`${!score.id || score.id < 0 ? styles.myScore : ""}`}
              >
                <td>{index + 1}</td>
                <td>{score.user}</td>
                <td>{score.score}</td>
              </tr>
            );
          })
      );
    }

    // 回答の候補を調査
    if (gameStatus == GAME_STATUS.endLose) {
      // 相手の最後のポケモンを取得
      // getTargetPokeだとfirstPokeで負けた時の挙動が正しくない
      const targetPoke = getNewestPoke(pokeMap, false) || firstPoke;
      // 相手のポケモンの最後の文字
      const lastWord = getShiritoriWord(targetPoke.name.japanese);
      const tmpCandidates = getCandidates(pokeMap, lastWord);
      if (
        !tmpCandidates.length ||
        tmpCandidates[0].name.japanese.endsWith("ン")
      ) {
        // 候補がなかった場合
      } else {
        // 候補がいるならループ
        while (
          Object.keys(candidateMap).length < 3 &&
          tmpCandidates.length > 0
        ) {
          const randomNum = Math.floor(Math.random() * tmpCandidates.length);
          const poke = tmpCandidates[randomNum];
          candidateMap[poke.id] = poke;
          // 候補をマップに追加
          setCandidateMap(JSON.parse(JSON.stringify(candidateMap)));
          setPokeImg(poke, setCandidateMap);

          // 候補から追加したものを削除
          tmpCandidates.splice(randomNum, 1);
        }
      }
    }

    // モーダルが見える前にランキング送信されたりするのを防ぐ
    setTimeout(() => {
      if (!allowSubmit) {
        setAllowSubmit(true);
      }
    }, 700);

    // キーボードショートカット
    /* 中の変数を動的にするようuseRefを用いる */
    const onKeydown = async (e: globalThis.KeyboardEvent) => {
      // モーダルが出ていない || 早すぎるEnter(押しっぱなしとか)の場合は早期リターン
      if (!showRef.current || !allowSubmitRef.current) return;
      if (e.key === "Enter") {
        // CtrlまたはCommand(Windowsキー)が押されていたら
        if (e.metaKey || e.ctrlKey) {
          setShowModal(false); // NOTE: 複数回送信が叩かれないようにする
          await handleSubmitNickname();
        }
      }
    };

    // 終了画面表示前からEnterを押しっぱなしにしてた場合に、
    // そのままランキング保存まで移行するのを防ぐための設定
    const onKeyUp = async () => {
      if (!allowSubmit) {
        setAllowSubmit(true);
      }
    };
    window.addEventListener("keydown", onKeydown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeydown);
      window.removeEventListener("keyup", onKeyUp);
    };

    // 初回のみ実行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleSubmitNickname = async () => {
    // 文字数チェック
    if (
      nicknameRef.current &&
      nicknameRef.current.length > CONFIG.score.nicknameMaxLen
    ) {
      setNicknameErr(
        `ニックネームは${CONFIG.score.nicknameMaxLen}文字以下にしてください`
      );
      return await Promise.reject(
        `ニックネームは${CONFIG.score.nicknameMaxLen}文字以下にしてください`
      );
    }

    // ワードチェック
    const katakanaLowerWords = [
      "\u{30a8}\u{30c3}\u{30c1}",
      "\u{9670}\u{6bdb}",
      "\u{30a4}\u{30f3}\u{30e2}\u{30a6}",
      "\u{30de}\u{30f3}\u{30b3}",
      "\u{30de}\u{25cb}\u{30b3}",
      "\u{30de}\u{3007}\u{30b3}",
      "\u{30de}\u{30f3}k",
      "\u{30de}\u{30bd}\u{30b3}",
      "\u{30de}\u{30f3}\u{500b}",
      "\u{30aa}\u{30e1}\u{30b3}",
      "\u{30f4}\u{30a1}\u{30ae}\u{30ca}",
      "\u{30af}\u{30ea}\u{30c8}\u{30ea}\u{30b9}",
      "\u{30c1}\u{30f3}\u{30b3}",
      "\u{30c1}\u{30f3}k",
      "\u{30c1}\u{30f3}\u{30c1}\u{30f3}",
      "\u{30c1}\u{30f3}\u{30dd}",
      "\u{30da}\u{30cb}\u{30b9}",
      "penis",
      "\u{30ad}\u{30f3}\u{30bf}\u{30de}",
      "\u{8089}\u{68d2}",
      "\u{52c3}\u{8d77}",
      "\u{30dc}\u{30c3}\u{30ad}",
      "\u{7cbe}\u{5b50}",
      "\u{5c04}\u{7cbe}",
      "\u{30b6}\u{30fc}\u{30e1}\u{30f3}",
      "\u{30bb}\u{30c3}\u{30af}\u{30b9}",
      "sex",
      "s\u{25cb}x",
      "s\u{3007}x",
      "\u{4f53}\u{4f4d}",
      "\u{6deb}\u{4e71}",
      "\u{30a2}\u{30ca}\u{30eb}",
      "anus",
      "\u{30aa}\u{30c3}\u{30d1}\u{30a4}",
      "oppai",
      "\u{30aa}\u{30c3}\u{30d1}\u{30aa}",
      "\u{5de8}\u{4e73}",
      "\u{30ad}\u{30e7}\u{30cb}\u{30e5}\u{30a6}",
      "\u{30ad}\u{30e7}\u{30cb}\u{30e5}\u{30fc}",
      "\u{8ca7}\u{4e73}",
      "\u{30d2}\u{30f3}\u{30cb}\u{30e5}\u{30a6}",
      "\u{30d2}\u{30f3}\u{30cb}\u{30e5}\u{30fc}",
      "\u{8c37}\u{9593}",
      "\u{30bf}\u{30cb}\u{30de}",
      "\u{4f55}\u{30ab}\u{30c3}\u{30d7}",
      "\u{30ca}\u{30cb}\u{30ab}\u{30c3}\u{30d7}",
      "\u{624b}\u{30d6}\u{30e9}",
      "\u{30c6}\u{30d6}\u{30e9}",
      "\u{30d1}\u{30f3}\u{30c4}",
      "\u{30d1}\u{30f3}\u{30c6}\u{30a3}",
      "\u{30d1}\u{30f3}t",
      "\u{30ce}\u{30fc}\u{30d1}\u{30f3}",
      "\u{4e73}\u{9996}",
      "\u{30c1}\u{30af}\u{30d3}",
      "\u{30d3}\u{30fc}\u{30c1}\u{30af}",
      "\u{81ea}\u{6170}",
      "\u{30aa}\u{30ca}\u{30cb}",
      "\u{30aa}\u{30ca}\u{4e8c}",
      "\u{30aa}\u{30ca}\u{30cc}",
      "\u{30de}\u{30b9}\u{30bf}\u{30fc}\u{30d9}\u{30fc}\u{30b7}\u{30e7}\u{30f3}",
      "\u{30b7}\u{30b3}\u{30c3}\u{30c6}",
      "\u{30b7}\u{30b3}\u{30b7}\u{30b3}",
      "\u{8131}\u{30b2}",
      "\u{30cc}\u{30b2}",
      "\u{8131}\u{30a4}\u{30c7}",
      "\u{30cc}\u{30a4}\u{30c7}",
      "\u{8131}\u{30b4}\u{30a6}",
      "\u{30cc}\u{30b4}\u{30a6}",
      "\u{5598}\u{30a4}\u{30c7}",
      "\u{30a2}\u{30a8}\u{30a4}\u{30c7}",
      "\u{30af}\u{30f3}\u{30cb}",
      "\u{30d5}\u{30a7}\u{30e9}",
      "\u{30de}\u{30f3}\u{30b0}\u{30ea}",
      "\u{30d1}\u{30a4}\u{30ba}\u{30ea}",
      "\u{98a8}\u{4fd7}",
      "\u{30d5}\u{30a6}\u{30be}\u{30af}",
      "\u{30d5}\u{30fc}\u{30be}\u{30af}",
      "\u{30bd}\u{30fc}\u{30d7}",
      "\u{30c7}\u{30ea}\u{30d8}\u{30eb}",
      "\u{30d8}\u{30eb}\u{30b9}",
      "\u{59e6}",
      "\u{5305}\u{830e}",
      "\u{30db}\u{30a6}\u{30b1}\u{30a4}",
      "\u{7ae5}\u{8c9e}",
      "\u{30c9}\u{30a6}\u{30c6}\u{30a4}",
      "\u{30c9}\u{30a6}\u{30c6}\u{30fc}",
      "\u{30c9}\u{30fc}\u{30c6}\u{30fc}",
      "\u{30c9}\u{30fc}\u{30c6}\u{30a4}",
      "\u{6027}\u{5668}",
      "\u{51e6}\u{5973}",
      "\u{30e4}\u{30ea}\u{30de}\u{30f3}",
      "\u{4e71}\u{4ea4}",
      "\u{30d0}\u{30a4}\u{30d6}",
      "\u{30ed}\u{30fc}\u{30bf}\u{30fc}",
      "\u{30d1}\u{30a4}\u{30d1}\u{30f3}",
      "\u{4e2d}\u{51fa}\u{30b7}",
      "\u{4e2d}\u{7530}\u{6c0f}",
      "\u{30b9}\u{30ab}\u{30c8}\u{30ed}",
      "\u{7cde}",
      "\u{30a6}\u{30f3}\u{30b3}",
      "\u{30d1}\u{30b3}\u{30d1}\u{30b3}",
      "\u{30db}\u{30e2}",
      "homo",
      "\u{30d1}\u{30a4}\u{30d1}\u{30a4}",
      "\u{30ce}\u{30fc}\u{30d6}\u{30e9}",
      "\u{624b}\u{30b3}\u{30ad}",
      "\u{624b}\u{30de}\u{30f3}",
      "\u{6f6e}\u{5439}",
      "\u{4e0b}\u{4e73}",
      "\u{6a2a}\u{4e73}",
      "\u{6307}\u{30de}\u{30f3}",
      "\u{72af}\u{30b7}",
      "\u{30ad}\u{30e2}\u{30a4}",
      "\u{30ad}\u{30e1}\u{30a8}",
      "\u{5909}\u{614b}",
      "\u{99ac}\u{9e7f}",
      "\u{30d0}\u{30fc}\u{30ab}",
      "baka",
      "fuck",
      "f*ck",
      "\u{30d5}\u{30a1}\u{30c3}\u{30af}",
      "\u{4e0d}\u{7d30}\u{5de5}",
      "\u{30d6}\u{30b5}\u{30a4}\u{30af}",
      "\u{30d6}\u{30b9}",
      "\u{6c17}\u{9055}\u{30a4}",
      "\u{57fa}\u{5730}\u{5916}",
      "\u{30d6}\u{30bf}",
      "\u{30af}\u{30bf}\u{30d0}\u{30ec}",
      "\u{6f70}\u{30bb}",
      "bitch",
      "\u{30d3}\u{30c3}\u{30c1}",
      "\u{6b7b}\u{30b9}",
      "\u{6b7b}\u{30ca}",
      "\u{6b7b}\u{30cc}",
      "\u{30b7}\u{30cc}",
      "\u{6b7b}\u{30cd}",
      "\u{30b7}\u{30cd}",
      "\u{6c0f}\u{30cd}",
      "shine",
      "\u{6b7b}\u{30ce}",
      "\u{6b7b}\u{30f3}",
      "\u{ff80}\u{ff8b}",
      "\u{6bba}\u{30b5}",
      "\u{6bba}\u{30b7}",
      "\u{6bba}\u{30b9}",
      "\u{30b3}\u{30ed}\u{30b9}",
      "\u{6bba}\u{30bb}",
      "\u{30b3}\u{30ed}\u{30bb}",
      "\u{6bba}\u{30bd}",
      "\u{4e5e}\u{98df}",
      "\u{30d0}\u{30d0}\u{30a2}",
      "\u{30d0}\u{30d0}\u{30a1}",
      "bba",
      "\u{30af}\u{30ba}",
      "\u{30b6}\u{30b3}",
      "\u{5927}\u{9ebb}",
      "\u{9ebb}\u{85ac}",
      "\u{899a}\u{30bb}\u{30a4}\u{5264}",
      "\u{899a}\u{9192}\u{5264}",
      "\u{30b3}\u{30ab}\u{30a4}\u{30f3}",
      "\u{30d8}\u{30ed}\u{30a4}\u{30f3}",
      "\u{30ec}\u{30a4}\u{30d7}",
      "rapist",
      "\u{5275}\u{4fa1}",
      "\u{6574}\u{5f62}",
      "\u{30ab}\u{30e9}\u{30ad}\u{30de}\u{30b9}\u{30bf}",
      "\u{0bcc}",
      "e\u{4e09}",
      "\u{5f15}\u{9000}\u{30aa}\u{30e1}",
    ];
    const inputKatakana =
      nicknameRef.current &&
      nicknameRef.current.replace(/[\u3041-\u3096]/g, (match) =>
        String.fromCharCode(match.charCodeAt(0) + 0x60)
      );
    // 入力値をカタカナかつ小文字に変換して比較
    const fixedInput = inputKatakana?.toLowerCase();
    if (katakanaLowerWords.some((word) => fixedInput?.includes(word))) {
      setNicknameErr("このニックネームは使用できません");
      return await Promise.reject("このニックネームは使用できません");
    }

    setLoading(true);
    // cookieに名前保存(デフォルト値の場合はCookieに保存しない)
    // NOTE: 既存ニックネームが空文字だとなぜかsetできないので除外
    if (nicknameRef.current && nicknameRef.current != "") {
      setCookie(
        null,
        COOKIE_NAMES.shiritori_nickname,
        nicknameRef.current,
        CONFIG.cookie
      );
    } else {
      destroyCookie(null, COOKIE_NAMES.shiritori_nickname);
    }

    const ok = await setRanking(nicknameRef.current || undefined, score);

    if (!ok) {
      console.error("store db failed.");
    }

    /* ランキングの変更を記録 */
    setCookie(null, COOKIE_NAMES.update_flg, COOKIE_VALUES.on, CONFIG.cookie);

    /* リロード */
    location.reload();
  };

  return (
    <PokeFinishModalPresenter
      monthRankRowAll={monthRankRowAll}
      score={score}
      candidateMap={candidateMap}
      showModal={showModal}
      nickname={nickname}
      nicknameErr={nicknameErr}
      myIndex={myIndex}
      myMonthIndex={myMonthIndex}
      isLoading={isLoading}
      previousBestScore={previousBestScore}
      isBestScore={isBestScore}
      os={os}
      innerWidth={innerWidth}
      onCloseModal={handleCloseModal}
      onChangeNickname={handleChangeNickname}
      onSubmitNickname={handleSubmitNickname}
    />
  );
}

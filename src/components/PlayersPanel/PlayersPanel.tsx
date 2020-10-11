import { IPlayer } from "utils/types";
import React from "react";
import PlayerSection from "components/PlayerSection";
import { useMobile } from "context/MobileContextProvider";
import { usePlayers } from "context/PlayersContextProvider";
import { useLocking } from "context/LockingContextProvider";
import useStyles from "./PlayersPanel.styles";
import { useTranslation } from "react-i18next";
import Button from "components/common/Button";

export default function PlayersPanel(): JSX.Element {
  const { t } = useTranslation();
  const {
    innocentPlayers,
    susPlayers,
    evilPlayers,
    deadPlayers,
    unknownPlayers,

    setInnocentPlayers,
    setSusPlayers,
    setEvilPlayers,
    setDeadPlayers,
    setUnknownPlayers,

    resetPlayersPositions,
  } = usePlayers()!; // eslint-disable-line

  const {
    isLocked,

    toggleLock,
  } = useLocking()!;

  const { isMobile } = useMobile()!; // eslint-disable-line

  const classes = useStyles({ isMobile });

  interface Section {
    title: string;
    list: Array<IPlayer>;
    setList: (value: Array<IPlayer>) => void;
  }

  const sections: Array<Section> = [
    {
      title: t("main.lists.innocent"),
      list: innocentPlayers,
      setList: setInnocentPlayers,
    },
    {
      title: t("main.lists.suspicious"),
      list: susPlayers,
      setList: setSusPlayers,
    },
    {
      title: `${t("main.lists.evil")} / ${t("main.lists.hitList")}`,
      list: evilPlayers,
      setList: setEvilPlayers,
    },
    {
      title: t("main.lists.dead"),
      list: deadPlayers,
      setList: setDeadPlayers,
    },
    {
      title: t("main.lists.unknown"),
      list: unknownPlayers,
      setList: setUnknownPlayers,
    },
  ];

  return (
    <div className={classes.PlayersPanel}>
      {sections.map(({ title, list, setList }) => (
        <PlayerSection
          key={title}
          title={title}
          list={list}
          setList={setList}
          isMobile={isMobile}
        />
      ))}

      <div className={classes.PlayersControls}>
        <Button
          className={classes.PlayersControlsButtons}
          onClick={() => toggleLock()}
        >
          {isLocked ? t("controls.unlockPlayers") : t("controls.lockPlayers")}
        </Button>

        {isMobile && (
          <Button
            className={classes.PlayersControlsButtons}
            onClick={() => resetPlayersPositions()}
          >
            Reset Positions
          </Button>
        )}
      </div>
    </div>
  );
}

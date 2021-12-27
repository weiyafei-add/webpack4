import React from "react";
import "./index.css";
import { ReactComponent as Play } from "../../../assets/player/play.svg";
import { ReactComponent as Pause } from "../../../assets/player/pause.svg";
import { ReactComponent as Next } from "../../../assets/player/next.svg";
import { ReactComponent as Prev } from "../../../assets/player/prev.svg";

interface ACProps {
  isPlaying: boolean;
  onPlayPauseClick: (playing: boolean) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
}

const AudioControl = (props: ACProps) => {
  const { isPlaying, onNextClick, onPlayPauseClick, onPrevClick } = props;

  return (
    <div className={`player-controls`}>
      <button type="button" className={`player-prev`} onClick={onPrevClick}>
        <Prev />
      </button>
      {isPlaying ? (
        <button
          type="button"
          className={`player-pause`}
          onClick={() => onPlayPauseClick(false)}
        >
          <Pause />
        </button>
      ) : (
        <button
          className={`player-play`}
          type="button"
          onClick={() => onPlayPauseClick(true)}
        >
          <Play />
        </button>
      )}
      <button type="button" className={`player-next`} onClick={onNextClick}>
        <Next />
      </button>
    </div>
  );
};

export default AudioControl;

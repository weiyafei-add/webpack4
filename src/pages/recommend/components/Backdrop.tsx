import React, { useEffect } from "react";

interface Bdprops {
  color: string;
  trankIndex: number;
  isPlaying: boolean;
}

const Backdrop = (props: Bdprops) => {
  const { color, trankIndex, isPlaying } = props;
  useEffect(() => {
    document.documentElement.style.setProperty("--active-color", color);
  }, [trankIndex, color]);

  return (
    <div className={`player-backdrop ${isPlaying ? "play" : "idle"}`}></div>
  );
};

export default Backdrop;

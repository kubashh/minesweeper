"use client";

import Header from "../components/Header";
import Board from "../components/Board";
import SelectLevel from "../components/SelectLevel";
import { level } from "../lib/consts";
import { startNewGame } from "../lib/util";
import { useClient } from "../lib/hooks";

export default function Home() {
  if (!useClient()) return; // it is needes, because of hydration error

  return <Game />;
}

function Game() {
  level.bind();

  return (
    <main className="py-2 px-6 bg-zinc-300 rounded-2xl w-fit m-auto">
      <Header />
      <Board />
      <SelectLevel />
    </main>
  );
}

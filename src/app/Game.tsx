import Header from "../components/Header";
import Board from "../components/Board";
import SelectLevel from "../components/SelectLevel";

export default function Game() {
  return (
    <main className="w-fit mx-auto py-2 px-6 rounded-2xl bg-zinc-300 select-none">
      <Header />
      <Board />
      <SelectLevel />
    </main>
  );
}

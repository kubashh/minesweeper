import Header from "../components/Header";
import Board from "../components/Board";
import SelectLevel from "../components/SelectLevel";

export default function Game() {
  return (
    <main className="py-2 px-6 bg-zinc-300 rounded-2xl w-fit m-auto">
      <Header />
      <Board />
      <SelectLevel />
    </main>
  );
}

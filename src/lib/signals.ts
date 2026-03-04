import { useState } from "react";

type Void = () => void;

function useRefresh() {
  const f = useState(false)[1];
  return () => f((prev) => !prev);
}

class Sig<T> {
  private v: T;
  refresh: Void = () => {
    throw Error(`Refresh not bind!`);
  };

  constructor(v: T) {
    this.v = v;
  }

  bind() {
    this.refresh = useRefresh();
  }

  get value() {
    return this.v;
  }
  set value(v: T) {
    this.v = v;
    this.refresh();
  }
}

export function signal<T>(v: T) {
  return new Sig(v);
}

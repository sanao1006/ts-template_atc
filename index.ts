import { readFileSync } from "fs";

function main(): void {
  const input: string[] = readFileSync("/dev/stdin", "utf8").trim().split("\n");
  const n: number = parseInt(input[0]);
  const rest: number[][] = input.slice(1).map(a => a.split(" ").map(Number));
  const g: Map<number, Array<number>> = new Map();

  rest.forEach(item => {
    item[0] -= 1;
    item[1] -= 1;
    const [a, b] = [item[0], item[1]];
    if (g.has(a)) {
      g.set(a, [...g.get(a)!, b]);
    } else {
      g.set(a, [b]);
    }
    if (g.has(b)) {
      g.set(b, [...g.get(b)!, a]);
    } else {
      g.set(b, [a]);
    }
  });

  const set = new Set();

  (() => {
    let ans = 0;
    (function dfs(mp: Map<number, Array<number>>, v: number): void {
      set.add(v);
      ans = Math.max(ans, v);
      let now: number[] | undefined = g.get(v);
      if (typeof now === "undefined") {
        now = [];
      }
      now!.forEach(item => {
        if (!set.has(item)) dfs(mp, item);
      });
    })(g, 0);
    console.log(ans + 1);
  })();
}

main();

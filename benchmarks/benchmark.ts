import {
  bench,
  BenchmarkRunResult,
} from "https://deno.land/std@0.56.0/testing/bench.ts";

import { prettyBenchmarkResult } from "https://deno.land/x/pretty_benching@refactor_coloring/mod.ts";

export function prepareBenchmarks() {
  bench({
    name: "runs100ForIncrementX1e6",
    runs: 200,
    func(b): void {
      b.start();
      for (let i = 0; i < 100; i++);
      b.stop();
    },
  });

  bench({
    name: "for100ForIncrementX1e6",
    runs: 100,
    func(b): void {
      b.start();
      for (let i = 0; i < 100; i++);
      b.stop();
    },
  });

  bench({
    name: "for100ForIncrementX1e8",
    runs: 100,
    func(b): void {
      b.start();
      for (let i = 0; i < 100; i++);
      b.stop();
    },
  });
}

export function formatResults(
  results: BenchmarkRunResult & { os?: any; metrics?: any; version?: any },
): string {
  let result = "";
  prettyBenchmarkResult({
    outputFn: (line?: string) => {
      result += `${line || ""}\n`;
      return;
    },
    nocolor: true
  })(results);
  return result;
}

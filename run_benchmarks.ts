import {
  runBenchmarks,
  BenchmarkRunResult,
} from "https://deno.land/std@0.56.0/testing/bench.ts";
import {
  writeJsonSync,
  writeFileStrSync,
} from "https://deno.land/std@0.56.0/fs/mod.ts";

const options = parseArgs(Deno.args);
// console.log('Running with args: ', options);

if (!options.module_path) {
  throw new Error("No benchmark module path was provided");
}

const benchmarker = await import(options.module_path);

if (
  !benchmarker.prepareBenchmarks ||
  typeof benchmarker.prepareBenchmarks != "function"
) {
  throw new Error(
    `No 'prepareBenchmarks' method was found in module imported from ${options.module_path}`,
  );
}

// make module add benchmarks itself
benchmarker.prepareBenchmarks();

const benchmarkResults: BenchmarkRunResult & {
  os?: any;
  metrics?: any;
  version?: any;
  date?: any;
} = await runBenchmarks({ silent: options.silent });

if (options.date) {
  benchmarkResults.date = new Date();
}

if (options.os) {
  benchmarkResults.os = Deno.build;
}

if (options.metrics) {
  benchmarkResults.metrics = Deno.metrics();
}

if (options.deno_v) {
  benchmarkResults.version = Deno.version;
}

if (
  benchmarker.formatResults && typeof benchmarker.formatResults == "function"
) {
  const userFormattedBenchmarkResult = benchmarker.formatResults(
    benchmarkResults,
  );
  console.info(`Writing formatted results to: ${options.formatted_path}`);
  writeFileStrSync(options.formatted_path, userFormattedBenchmarkResult);
}

console.info(`Writing json results to: ${options.json_path}`);
writeJsonSync(options.json_path, benchmarkResults, { spaces: 2 });

// -------------------- Args Parser ---------------------

function parseArgs(args: string[]): options { // TODO Should use a proper parser
  const defOptions: options = {
    module_path: "./benchmarks/benchmark.ts",
    formatted_path: "./benchmarks/benchmarks.txt",
    json_path: "./benchmarks/benchmarks.json",
    silent: false,

    os: false,
    metrics: false,
    deno_v: false,
    date: false,
  };

  [
    {
      regexp: /^-os$/,
      proc: (arg: string, options: options, p?: string) => {
        options.os = true;
      },
    },
    {
      regexp: /^-metrics$/,
      proc: (arg: string, options: options, p?: string) => {
        options.metrics = true;
      },
    },
    {
      regexp: /^-dv$/,
      proc: (arg: string, options: options, p?: string) => {
        options.deno_v = true;
      },
    },
    {
      regexp: /^-date$/,
      proc: (arg: string, options: options, p?: string) => {
        options.date = true;
      },
    },

    {
      regexp: /^-s$/,
      proc: (arg: string, options: options, p?: string) => {
        options.silent = true;
      },
    },

    {
      regexp: /^--json=([^\s]*)$/,
      proc: (arg: string, options: options, p?: string) => {
        options.json_path = p!;
      },
      isParam: true,
    },
    {
      regexp: /^--formatted=([^\s]*)$/,
      proc: (arg: string, options: options, p?: string) => {
        options.formatted_path = p!;
      },
      isParam: true,
    },
    {
      regexp: /^--benches=([^\s]*)$/,
      proc: (arg: string, options: options, p?: string) => {
        options.module_path = p!;
      },
      isParam: true,
    },
  ].forEach((op) => {
    const matchingArg = args.find((arg) => op.regexp.test(arg));
    if (!!matchingArg) {
      if (op.isParam) {
        console.log();
        op.proc(matchingArg, defOptions, op.regexp.exec(matchingArg)![1]);
      } else {
        op.proc(matchingArg, defOptions);
      }
    }
  });

  return defOptions;
}

interface options {
  module_path: string;
  formatted_path: string;
  json_path: string;
  silent: boolean;

  os: boolean;
  metrics: boolean;
  deno_v: boolean;
  date: boolean;
}

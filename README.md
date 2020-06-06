# deno_bencher

Makes it easier to handle your benchmarks, run them on CI and save the results into your repo

## Usage

Install as a script with deno install, use in a CI job like [this](./.github/workflows/benchmarks.yml), or run it by hand.

```batch
deno run -A --unstable --allow-hrtime https://deno.land/x/gh:littletof:deno_bencher/run_benchmarks.ts --benches=./benchmarks/benchmarks.ts --json=./benchmarks/benchmarks.json --formatted=./benchmarks/benchmarks.txt -s -os -dv -date -metrics
```

This will look for the file `./benchmarks/benchmarks.ts` (from `--benches` flag) dynamically import it and call `prepareBenchmarks()` on it if it exists. In it you can add all your benches that you want to run.

After that it will execute all the benchmarks and than write its results into `./benchmarks/benchmarks.json` (from `--json` flag).

If your module has a `formatResults(results: BenchmarkRunResults): string` method, it will call it, than save its string result into `./benchmarks/benchmarks.txt` (from `--formatted` flag)

## Options

- `--benches` : a path where the module having `prepareBenchmarks` and `formatResults` is. (default: `./benchmarks/benchmarks.ts`)
- `--json` : a path where the bare results should be saved. (default: `./benchmarks/benchmarks.json`)
- `--formatted` : a path where the formatted results should be saved. Only used if `formatResults` method exists in module (default: `./benchmarks/benchmarks.txt`)
- `-s` : makes `runBenchmarks` to run with `silent` flag
- `-os` : puts `Deno.build` into the results `os` property
- `-dv` : puts `Deno.version` into the results `deno_v` property
- `-date` : puts the date into the results `date` property
- `-metrics` : puts `Deno.metrics()` into the results `metrics` property


## Restrict permissions of the script

It needs `--unstable` (at least right now), and `--allow-net` because the dynamically imported module needs to download its imports. Setting `--allow-hrtime` makes the measurement more precise.

```batch
deno run --allow-hrtime --allow-read=./benchmarks --allow-write=./benchmarks/benchmarks.json,./benchmarks/benchmarks.txt --unstable --allow-net https://deno.land/x/gh:littletof:deno_bencher/run_benchmarks.ts --json=./benchmarks/benchmarks.json --formatted=./benchmarks/benchmarks.txt -s -os -dv -date -metrics
```

## As a Github Action / CI job

This script can be easily used to keep track of your code's performance during developement. Run this script, than push the results into your repo with another action, like [this](https://github.com/marketplace/actions/add-commit). There is an example of a Github Action that does this in this repo [here](./.github/workflows/benchmarks.yml)

# TODOS

- [ ] Option to turn off default .json save and use only formatted
- [ ] Format the measuredRunsMs array into a more compact format
- [ ] make into a proper Github Action
- [ ] add script to [deno.land/x/](https://deno.land/x)
- [ ] Tidy up# deno_bencher

Makes it easier to handle your benchmarks, run them on CI and save the results into your repo

## Usage

Install as a script with deno install, use in a CI job like [this](./.github/workflows/benchmarks.yml), or run it by hand.

```batch
deno run -A --unstable --allow-hrtime https://deno.land/x/gh:littletof:deno_bencher/run_benchmarks.ts --benches=./benchmarks/benchmarks.ts --json=./benchmarks/benchmarks.json --formatted=./benchmarks/benchmarks.txt -s -os -dv -date -metrics
```

This will look for the file `./benchmarks/benchmarks.ts` (from `--benches` flag) dynamically import it and call `prepareBenchmarks()` on it if it exists. In it you can add all your benches that you want to run.

After that it will execute all the benchmarks and than write its results into `./benchmarks/benchmarks.json` (from `--json` flag).

If your module has a `formatResults(results: BenchmarkRunResults): string` method, it will call it, than save its string result into `./benchmarks/benchmarks.txt` (from `--formatted` flag)

## Options

- `--benches` : a path where the module having `prepareBenchmarks` and `formatResults` is. (default: `./benchmarks/benchmarks.ts`)
- `--json` : a path where the bare results should be saved. (default: `./benchmarks/benchmarks.json`)
- `--formatted` : a path where the formatted results should be saved. Only used if `formatResults` method exists in module (default: `./benchmarks/benchmarks.txt`)
- `-s` : makes `runBenchmarks` to run with `silent` flag
- `-os` : puts `Deno.build` into the results `os` property
- `-dv` : puts `Deno.version` into the results `deno_v` property
- `-date` : puts the date into the results `date` property
- `-metrics` : puts `Deno.metrics()` into the results `metrics` property


## Restrict permissions of the script

It needs `--unstable` (at least right now), and `--allow-net` because the dynamically imported module needs to download its imports. Setting `--allow-hrtime` makes the measurement more precise.

```batch
deno run --allow-hrtime --allow-read=./benchmarks --allow-write=./benchmarks/benchmarks.json,./benchmarks/benchmarks.txt --unstable --allow-net https://deno.land/x/gh:littletof:deno_bencher/run_benchmarks.ts --json=./benchmarks/benchmarks.json --formatted=./benchmarks/benchmarks.txt -s -os -dv -date -metrics
```

## As a Github Action / CI job

This script can be easily used to keep track of your code's performance during developement. Run this script, than push the results into your repo with another action, like [this](https://github.com/marketplace/actions/add-commit). There is an example of a Github Action that does this in this repo [here](./.github/workflows/benchmarks.yml)

# TODOS

- [ ] Option to turn off default .json save and use only formatted
- [ ] Format the measuredRunsMs array into a more compact format
- [ ] make into a proper Github Action
- [ ] add script to [deno.land/x/](https://deno.land/x)
- [ ] Tidy up
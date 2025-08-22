import esbuild from "esbuild";

const options = {
  entryPoints: ["./src/index"],
  outdir: "./dist",
  sourcemap: true,
  format: "esm",
  plugins: [
    {
      name: "logger",
      setup: (build) => {
        let s;
        build.onStart(() => {
          s = performance.now();
          console.log("Rebuilding jastx-parse...");
        });

        build.onEnd(() => {
          console.log(
            "Built jastx-parse in",
            Math.round(performance.now() - s),
            "milliseconds"
          );
        });
      },
    },
  ],
};

if (process.argv.includes("--watch")) {
  const ctx = await esbuild.context({ ...options });
  ctx.watch();
} else {
  await esbuild.build({ ...options });
}

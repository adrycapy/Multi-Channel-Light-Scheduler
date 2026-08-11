import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    file: "custom_components/multichannel_scheduler/www/multichannel-scheduler-card.js",
    format: "es",
    sourcemap: false,
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
  ],
};

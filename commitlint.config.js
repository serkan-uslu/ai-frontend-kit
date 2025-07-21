module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // add new feature
        "fix", // bug fix
        "docs", // documentation
        "style", // code style
        "refactor", // refactor
        "perf", // performance
        "test", // test
        "build", // build
        "ci", // CI configuration
        "chore", // other changes
        "revert", // revert
      ],
    ],
    "subject-case": [2, "never", ["upper-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100],
  },
};

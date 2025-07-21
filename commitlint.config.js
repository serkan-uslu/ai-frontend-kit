module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Yeni özellik
        "fix", // Bug fix
        "docs", // Dokümantasyon değişikliği
        "style", // Kod formatı değişikliği
        "refactor", // Kod refaktörü
        "perf", // Performans iyileştirmesi
        "test", // Test ekleme/değiştirme
        "build", // Build sistemi değişikliği
        "ci", // CI konfigürasyon değişikliği
        "chore", // Diğer değişiklikler
        "revert", // Geri alma
      ],
    ],
    "subject-case": [2, "never", ["upper-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100],
  },
};

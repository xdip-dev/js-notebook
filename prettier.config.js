module.exports = {
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    trailingComma: "es5",
    arrowParens: "always",
    overrides: [
      {
        files: "*.ts",
        options: {
          parser: "typescript",
        },
      },
    ],
  };
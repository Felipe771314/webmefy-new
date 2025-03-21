module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Aquí puedes agregar reglas personalizadas si quieres
    // Por ejemplo, para exigir un tipo de commit válido:
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'revert'],
    ],
  },
};

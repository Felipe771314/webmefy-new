const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000',
    token: process.env.SONARQUBE_TOKEN, // Asegúrate de definirlo en .env o pasar como variable de entorno
    options: {
      'sonar.projectKey': 'shopify-store',
      'sonar.projectName': 'Shopify Store',
      'sonar.projectVersion': '1.0',
      'sonar.sources': './',
      'sonar.tests': './',
      'sonar.language': 'js',
      'sonar.sourceEncoding': 'UTF-8',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
    },
  },
  () => process.exit(),
);

const fs = require('fs');

const ejsFilePath = 'views/gamelist.ejs'; // Replace with the correct path to your EJS file

(async () => {
  try {
    const { default: ejsLint } = await import('ejs-lint');

    fs.readFile(ejsFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading ${ejsFilePath}: ${err}`);
        process.exit(1);
      }

      const results = ejsLint(data, { client: true });

      if (results && results.errors && results.errors.length > 0) {
        results.errors.forEach((error) => {
          console.error(`EJS Lint Error: ${error.reason} (Line ${error.line}, Column ${error.column})`);
        });
        process.exit(1);
      } else {
        console.log('EJS linting passed successfully.');
      }
    });
  } catch (error) {
    console.error(`Error importing ejs-lint: ${error}`);
    process.exit(1);
  }
})();

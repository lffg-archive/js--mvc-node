const Core = require('./system/core');

let app;
try {
  app = Core(__dirname);
} catch (e) {
  console.log(e.message);
}

if (app !== undefined) {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening at: ${process.env.PORT || 3000}.`);
  });
}

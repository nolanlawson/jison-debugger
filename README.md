# jison-debugger

Web UI for debugging [Jison](https://github.com/zaach/jison) grammars, written in React.js.

Setup: `npm install && bower install`

Developing: use `gulp watch`. This was created with [a Yeoman generator](https://github.com/randylien/generator-react-gulp-browserify).

Recompiling Jison: `npm run build-jison`. I'm using a special build of Jison for debugging.

Deploying to gh-pages: use `npm run deploy`. It will build the project and push to the `gh-pages` branch.

const pkg = require('./package.json');
const { cli, sh } = require('tasksfile');

function watchCmd(globs, cmd) {
  let globArgs = globs.join(`' '`);
  return sh(`chokidar '${globArgs}' -c '${cmd}'`, { async: true });
}

async function css({ watch } = {}) {
  await Promise.all([
    sh('postcss src/css/hack.css --base src/css --dir dist', { async: true }),
    sh('postcss src/css/themes/*.css --base src/css/themes --dir dist', { async: true })
  ]);
  sh('mkdir -p demo');
  sh('cp -r dist/* demo/');
}

function html({ watch } = {}) {
  let options = {
    time: Date.now(),
    version: pkg.version,
    build: Math.floor(Date.now() / 1000)
  };
  sh('mkdir -p demo');
  sh(`pug -P -O '${JSON.stringify(options)}' src/html --out demo`);
}

function static() {
  sh('mkdir -p demo');
  sh('cp -r src/static/* demo');
}

function toc() {
  sh('markdown-toc -i README.md');
}

function deploy() {
  sh('gh-pages -d demo');
}

function clean() {
  sh('rm -rf dist demo');
}

function serve() {
  sh('serve -l 4001 ./demo');
}

async function watch() {
  await buildAll();
  watchCmd(['src/css/*.css', 'src/css/**/*.css'], 'task build:css');
  watchCmd(['src/html/*.pug', 'src/html/**/*.pug'], 'task build:html');
  watchCmd(['src/static/*', 'src/static/**/*'], 'task build:static');
}

async function buildAll() {
  await css();
  await html();
  await static();
}

const build = { css, html, static, toc, default: buildAll };

cli({ clean, build, deploy, watch, serve });

# Demo Desk

A small static page used as the target project in a film about
[Wicked](https://wicked.clawdoc.dev), a visual desk for multi-agent pipelines.
On camera, Wicked's Feature board takes a request, plans and designs it, has a coding
agent implement it in this repository, and has a Critic review the result.

- `npm test` checks the page and that every local asset it references exists.
- `npm run build` copies the site into `dist/`.
- `npm start` serves the project at http://127.0.0.1:8095/ (`npm start -- dist` serves the build).

No dependencies; Node 22 or newer.

Live preview: https://thamam.github.io/wicked-demo-desk/ — redeploys on every push to main.

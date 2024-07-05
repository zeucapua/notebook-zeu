export const files = [
  { 
    title: "./server.js",
    content: `
    const app = express();
    let vite;

    ...

    app.listen(port, () => {
      console.log('Server started at http://localhost:3000');
    });
    `.split("\n"),
  },
  {
    title: "./src/entry-server.ts",
    content: `
    import App from "./App.svelte";
    
    export function render() {
      return App.render();
    }
    `.split("\n"),
  },
  {
    title: "./src/entry-client.ts",
    content: `
    import App from "./App.svelte";

    new App({
    target: document.getElementById("app"),
      hydratable: true
    });
    `.split("\n"),
  }
];


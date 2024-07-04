export const file_code = {
  "./server.js": `
    const app = express();
    let vite;

    ...

    app.listen(port, () => {
      console.log('Server started at http://localhost:3000');
    });
  `,
  "./src/entry-server.ts": `
    import App from "./App.svelte";
    
    export function render() {
      return App.render();
    }
  `,
  "./src/entry-client.ts": `
    import App from "./App.svelte";

    new App({
    target: document.getElementById("app"),
      hydratable: true
    });
  `,
};

export const files: Record<string, string[]> = {
  "./server.js": file_code["./server.js"].split("\n"),
  "./src/entry-server.ts": file_code["./src/entry-server.ts"].split("\n"),
  "./src/entry-client.ts": file_code["./src/entry-client.ts"].split("\n")
}; 

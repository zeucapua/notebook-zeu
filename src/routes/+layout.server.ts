import { GITHUB_AUTH_TOKEN } from "$env/static/private";

export async function load() {
  const gh_response = await fetch("https://api.github.com/repos/zeucapua/notebook-zeu", {
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${GITHUB_AUTH_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });

  const data = await gh_response.json();

  return { updated_at: data.updated_at };
}

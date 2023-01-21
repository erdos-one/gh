// Set the help message
const helpMessage: string = `GitHub raw content URL shortener

USAGE
  Fetch any raw file:
    gh.erdos.one/user/repo/branch/filepath

  Fetch a raw file from the main branch
    gh.erdos.one/user/repo/filepath

  Fetch the file install.sh from the main branch
    gh.erdos.one/user/repo

LEARN MORE
  Read the docs at https://oss.erdos.one/gh

FEEDBACK
  Open an issue on GitHub: https://github.com/erdos-one/gh
`

// Return the raw content of a file from a GitHub repository
async function ghuc(user: string, repo: string, branch: string, path: string): Promise<Response> {
  const ghucURL: string = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`
  return await fetch(ghucURL)
}

// Handle requests to the Cloudflare worker
export default {
  async fetch(request: Request) {
    // Get the path from the request URL and split it into an array
    const url = new URL(request.url)
    const paths = url.pathname.replace(/^\/+|\/+$/g, "").split("/")

    // Handle the different cases of the path
    if (paths.length === 2) {
      // Path has only two elements, assume that the branch is "main" and the file is "install.sh"
      return await ghuc(paths[0], paths[1], "main", "install.sh")
    } else if (paths.length === 3) {
      // Path has three elements, assume that the branch is "main", the first element is the user,
      // the second is the repo, and the third is the file
      return await ghuc(paths[0], paths[1], "main", paths[2])
    } else if (paths.length > 3) {
      // Path has more than three elements, assume that the first element is the user, the second
      // is the repo, the third is the branch, and the rest is the file path
      return await ghuc(paths[0], paths[1], paths[2], paths.slice(3).join("/"))
    } else {
      // Path has less than two elements, return the help message to enable proper usage
      return new Response(helpMessage);
    }
  }
}

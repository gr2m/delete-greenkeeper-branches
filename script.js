module.exports = deleteGreenkeeperBranches;

/**
 * Create a CODE_OF_CONDUCT.md file unless it already exists.
 * Ignores forks and archived repositories
 *
 * @param {import('@octokit/core').Octokit} octokit
 * @param {import('@octokit/types').Endpoints["GET /repos/:owner/:repo"]["response"]["data"]} repository
 * @param {object} options
 */
async function deleteGreenkeeperBranches(octokit, repository, options) {
  if (repository.archived) {
    octokit.log.info(`${repository.html_url} is archived, ignoring.`);
    return;
  }

  const owner = repository.owner.login;
  const repo = repository.name;

  const refs = await octokit.paginate(
    "GET /repos/{owner}/{repo}/git/matching-refs/{ref}",
    {
      owner,
      repo,
      ref: "heads/greenkeeper/",
    }
  );

  const branchRefs = refs.map(({ ref }) => ref.substr("refs/".length));

  console.log(
    `${branchRefs.length} greenkeeper/* branches found in ${owner}/${repo}`
  );
  for (const ref of branchRefs) {
    await octokit.request("DELETE /repos/{owner}/{repo}/git/refs/{ref}", {
      owner,
      repo,
      ref,
    });
    process.stdout.write(".");
  }
  console.log("");
}

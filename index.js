// Checks API example
// See: https://developer.github.com/v3/checks/ to learn more

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  app.on(['status'], link)

  /* This is annoying because CircleCI does not use the App API we need to monitor statuses */
  async function link (context) {
    if (context.payload.context !== 'ci/circleci: build' || context.payload.state === 'pending') {
      return
    }
    const state = (context.payload.state === 'success') ? 'success' : 'neutral'
    const buildId = context.payload.target_url.split('?')[0].split('/').slice(-1)[0]
    const repoId = context.payload.repository.id
    const url = 'https://' + buildId + '-' + repoId + '-gh.circle-artifacts.com/0/test_artifacts/README.md'
    // Create the status
    return context.github.repos.createStatus(context.repo({
      sha: context.payload.sha,
      state: state,
      target_url: url,
      description: 'CircleCI artifacts link',
      context: 'ci/circleci: artifacts'
    }))
  }

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}

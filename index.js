// Checks API example
// See: https://developer.github.com/v3/checks/ to learn more

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  app.on(['check_suite.requested', 'check_run.rerequested'], start)
  app.on(['check_run.completed'], stop)

  async function start (context) {
    const startTime = new Date()

    // Do stuff
    const { head_branch: headBranch, head_sha: headSha } = context.payload.check_suite
    // Probot API note: context.repo() => {username: 'hiimbex', repo: 'testing-things'}
    return context.github.checks.create(context.repo({
      name: 'CircleCI Artifacts Redirector',
      head_branch: headBranch,
      head_sha: headSha,
      started_at: startTime,
      completed_at: new Date(),
      status: 'queued',
      conclusion: 'neutral',
      output: {
        title: 'Artifacts',
        summary: 'Waiting for CircleCI run to complete'
      }
    }))
  }

    async function stop (context) {
      if ( context.name != "CircleCI" ) {
        return
      }
      const startTime = new Date()
      if (context.conclusion == 'success') {
        conclusion = 'success'
      }
      else {
        conclusion = 'neutral'
      }
      url = context.check_suite.url
      const { head_branch: headBranch, head_sha: headSha } = context.payload.check_suite
      // Probot API note: context.repo() => {username: 'hiimbex', repo: 'testing-things'}
      return context.github.checks.create(context.repo({
        name: 'CircleCI Artifacts Redirector',
        head_branch: headBranch,
        head_sha: headSha,
        started_at: startTime,
        completed_at: new Date(),
        status: 'completed',
        conclusion: conclusion,
        details_url: url,
        output: {
          title: 'Artifacts',
          summary: 'CircleCI run complete'
        }
      }))
    }

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}

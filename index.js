// This as annoying because CircleCI does not use the App API.
// Hence we must monitor statuses rather than using the more convenient
// "checks" API.

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  app.on(['status'], link)

  async function link (context) {
    if (context.payload.context !== 'ci/circleci: build' || context.payload.state === 'pending') {
      context.log('Ignoring:')
      context.log(context.payload.context)
      context.log(context.payload.state)
      return
    }
    context.log('Processing:')
    context.log(context.payload.context)
    context.log(context.payload.state)
    // Adapted (MIT license) from https://github.com/Financial-Times/ebi/blob/master/lib/get-contents.js
    const filepath = '.circleci/artifact_path'
    var path = ''
    try {
      const repoData = await context.github.repos.getContents(context.repo({ ref: context.payload.sha, path: filepath }))
      path = Buffer.from(repoData.data.content, 'base64').toString('utf8')
    } catch (error) {
      if (error.status === 404) {
        throw new Error(`404 ERROR: file '${filepath}' not found`)
      } else {
        throw error
      }
    }
    // Set the new status
    const state = (context.payload.state === 'success') ? 'success' : 'neutral'
    const buildId = context.payload.target_url.split('?')[0].split('/').slice(-1)[0]
    const repoId = context.payload.repository.id
    const url = 'https://' + buildId + '-' + repoId + '-gh.circle-artifacts.com/' + path
    context.log('Linking to:')
    context.log(url)
    return context.github.repos.createStatus(context.repo({
      sha: context.payload.sha,
      state: state,
      target_url: url,
      description: 'Link to ' + path,
      context: 'ci/circleci: artifact'
    }))
  }
}

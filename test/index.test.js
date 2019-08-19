const nock = require('nock')
// Requiring our app implementation
const myProbotApp = require('..')
const { Probot } = require('probot')
// Requiring our fixtures
const statusPayload = require('./fixtures/status')
const checkRunComplete = require('./fixtures/response')

nock.disableNetConnect()

describe('My Probot app', () => {
  let probot

  beforeEach(() => {
    probot = new Probot({})
    // Load our app into probot
    const app = probot.load(myProbotApp)

    // just return a test token
    app.app = () => 'test'
  })

  test('creates a passing check', async () => {
    nock('https://api.github.com')
      .post('/app/installations/2/access_tokens')
      .reply(200, { token: 'test' })

    nock('https://api.github.com')
      .post('/repos/larsoner/circleci-artifacts-redirector/fix', (body) => {
        body.started_at = '2018-10-05T17:35:21.594Z'
        body.completed_at = '2018-10-05T17:35:53.683Z'
        expect(body).toMatchObject(checkRunComplete)
        return true
      })
      .reply(200)

    // Receive a webhook event
    await probot.receive({ name: 'check_suite', payload: statusPayload })
  })
})

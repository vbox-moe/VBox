const got = require('got')

const { NUMBER, VBOX_DEPLOY_TOKEN } = process.env

const log = (msg) => {
  console.log(msg)
  return msg
}

got(log(`https://api.github.com/repos/vbox-moe/VBox/pulls/${NUMBER}`))
  .json()
  .then(async ({ head: { label } }) => {
    if (label.startsWith('vbox-moe:submit/')) {
      const issueNumber = Number(label.replace('vbox-moe:submit/', ''))
      await got.post(
        log(
          `https://api.github.com/repos/vbox-moe/VBox/issues/${issueNumber}/comments`
        ),
        {
          json: {
            body: `Closing since #${NUMBER} is closed.`
          },
          headers: {
            authorization: `Bearer ${VBOX_DEPLOY_TOKEN}`
          }
        }
      )
      await got.patch(
        log(`https://api.github.com/repos/vbox-moe/VBox/issues/${issueNumber}`),
        {
          json: {
            state: 'closed'
          },
          headers: {
            authorization: `Bearer ${VBOX_DEPLOY_TOKEN}`
          }
        }
      )
    } else {
      console.log('Not bot. Skipped.')
    }
  })

const axios = require('axios')

const { NUMBER, VBOX_DEPLOY_TOKEN } = process.env

const log = (msg) => {
  console.log(msg)
  return msg
}

axios
  .get(log(`https://api.github.com/repos/vbox-moe/VBox/pulls/${NUMBER}`))
  .then(async (response) => {
    const {
      head: { label }
    } = JSON.parse(response.data)
    if (label.startsWith('vbox-moe:submit/')) {
      const issueNumber = Number(label.replace('vbox-moe:submit/', ''))
      await axios.post(
        log(
          `https://api.github.com/repos/vbox-moe/VBox/issues/${issueNumber}/comments`
        ),
        {
          data: {
            body: `Closing since #${NUMBER} is closed.`
          },
          headers: {
            authorization: `Bearer ${VBOX_DEPLOY_TOKEN}`
          }
        }
      )
      await axios.patch(
        log(`https://api.github.com/repos/vbox-moe/VBox/issues/${issueNumber}`),
        {
          data: {
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

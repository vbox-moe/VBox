const { writeFile } = require('fs').promises
const { join } = require('path')
const { GitProcess } = require('dugite')

const { ISSUE_NUMBER, ISSUE_BODY, VBOX_DEPLOY_TOKEN } = process.env
const branchName = `submit/${ISSUE_NUMBER}`
const remote = `https://${VBOX_DEPLOY_TOKEN}@github.com/vbox-moe/VBox.git`

const decodeBase64 = (base64) => String(Buffer.from(base64, 'base64'))

const gitExec = async (params) => {
  const { stdout, stderr } = await GitProcess.exec(params, process.cwd(), {
    env: {
      GIT_AUTHOR_NAME: 'VBox Bot',
      GIT_AUTHOR_EMAIL: 'vboxbot@outlook.com',
      GIT_COMMITTER_NAME: 'VBox Bot',
      GIT_COMMITTER_EMAIL: 'vboxbot@outlook.com'
    }
  })
  console.log(stdout + ' (stdout)')
  console.log(stderr + ' (stderr)')
}

;(async () => {
  await gitExec(['branch', branchName])
  await gitExec(['checkout', branchName])
  const block = ISSUE_BODY.split('-----END SUBMIT BLOCK-----')[0].split(
    '-----BEGIN SUBMIT BLOCK-----'
  )[1]
  if (block) {
    console.log(
      `Submit block finded. Start processing with issue#${ISSUE_NUMBER}`
    )
    console.log('BLOCK:' + block)
    const blockData = decodeBase64(block)
      .split(':')
      .map((x) => decodeBase64(x))
    console.log('PATH: ' + blockData[0])
    const path = join('docs', blockData[0])
    await writeFile(path, blockData[1])
    await gitExec(['push', '--set-upstream', remote, branchName])
    await gitExec(['add', 'docs'])
    await gitExec([
      'commit',
      '-m',
      'update',
      '-m',
      ISSUE_BODY,
      '-m',
      `close #${ISSUE_NUMBER}`
    ])
  } else console.log('Skipped with no submit block.')
})()

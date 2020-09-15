/* eslint-disable @typescript-eslint/no-var-requires */
const readline = require('readline')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()
let dbPromise = new Promise(res => {
  const db = new sqlite3.Database(path.join(__dirname, '../prisma/dev.db'), err => {
    errout(err)
    res(db)
  })
})
const rl = readline.createInterface(process.stdin)
rl.on('line', async line => {
  const { topics, player, client_id, text, simplified, filtered, flags } = JSON.parse(line)

  const db = await dbPromise
  db.run(
    `INSERT INTO Message 
    (\`player\`,
    \`client_id\`,
    \`text\`,
    \`simplified\`,
    \`filtered\`,
    \`flags\`)
    VALUES
    (?,?,?,?,?,?)
    `,
    [player, client_id, text, simplified, filtered, flags],
    function(err) {
      errout(err)
      const { lastID: messageId } = this
      topics.forEach(({ topic, relevance, confidence }) => {
        db.run(
          `INSERT INTO Topic
                    (\`topic\`,
                \`messageId\`,
                \`relevance\`,
                \`confidence\`)
                VALUES (?,?,?,?)
             `,
          [topic, messageId, relevance, confidence],
          errout
        )
      })
    }
  )
})

function errout(err) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
}

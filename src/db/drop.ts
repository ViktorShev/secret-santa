import db from '@/db'

function drop() {
  db.prepare(`DROP TABLE IF EXISTS participants`).run()
}

drop()
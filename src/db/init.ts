import db from "@/db";
import { randomId } from "@/utils/random";

function init() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS participants (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      nameWhenDrawn TEXT NOT NULL UNIQUE,
      code TEXT NOT NULL UNIQUE,
      assignedTo TEXT UNIQUE
    )
  `).run()

  const members = [
    { name: "Витя", nameWhenDrawn: "Вите" },
    { name: "Соня", nameWhenDrawn: "Соне" },
    { name: "Настя", nameWhenDrawn: "Насте" },
    { name: "Надя", nameWhenDrawn: "Наде" },
    { name: "Сергей", nameWhenDrawn: "Сергею" },
    { name: "Баба Аня", nameWhenDrawn: "Бабе Ане" },
    { name: "Катя", nameWhenDrawn: "Кате" },
    { name: "Алина", nameWhenDrawn: "Алине" },
    { name: "Саша", nameWhenDrawn: "Саше" },
  ]

  const insert = db.prepare("INSERT INTO participants (name, nameWhenDrawn, code) VALUES (?, ?, ?)");
  
  for (const member of members) {
    const code = randomId(8)
    const insertRes = insert.run(member.name, member.nameWhenDrawn, code);
    console.log(`Inserted participant: ${member.name} with code: ${code} and ID: ${insertRes.lastInsertRowid}`);
  }
}

init()
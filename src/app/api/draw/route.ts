import db from "@/db";
import { Participant } from "@/db/schema";

export async function POST(req: Request) {
  const { code } = await req.json();

  const participant = db
    .prepare("SELECT * FROM participants WHERE code = ?")
    .get(code) as Participant

  if (!participant) {
    return new Response("Invalid code", { status: 400 });
  }

  if (participant.assignedTo) {
    return Response.json({ assignedTo: participant.assignedTo });
  }

  const others = db
    .prepare("SELECT nameWhenDrawn FROM participants WHERE name != ? AND assignedTo IS NULL")
    .all(participant.name) as { nameWhenDrawn: string }[];

  const target = others[Math.floor(Math.random() * others.length)].nameWhenDrawn;

  db.prepare("UPDATE participants SET assignedTo = ? WHERE code = ?")
    .run(target, code);

  return Response.json({ assignedTo: target });
}
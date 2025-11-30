import { Draw } from "@/components/draw";
import db from "@/db";
import { Participant } from "@/db/schema";
import Image from "next/image";
import styles from "./page.module.css";

export const dynamic = "force-dynamic"

export default async function Home({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c: code } = await searchParams

  if (!code) {
    return <h1 className={styles['christmas-title']}>Не найден код</h1>
  }

  const participant = db
    .prepare("SELECT name, assignedTo FROM participants WHERE code = ?")
    .get(code) as Participant

  if (!participant) {
    return <h1 className={styles['christmas-title']}>Неверный код</h1>
  }

  return (
    <main className={styles.main}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/snowfall.gif" alt="Snowfall" className={styles.snowfall} />
      <h1 className={styles['christmas-title']}>
        <span className={styles['letter-c']}>
          С
          <Image className={styles.hat} src="/christmas-hat.png" alt="Christmas hat" width={100} height={100}/>
        </span>
        екретный Санта
      </h1>
      <h2 className={styles.greeting}>Привет, <span className={styles.highlight}>{participant.name}</span></h2>
      <Draw
        code={code}
        assignedTo={participant.assignedTo}
        buttonLabel="Узнать моего счастливчика"
      />
    </main>
  );
}

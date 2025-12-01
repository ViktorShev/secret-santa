'use client'

import styles from './styles.module.css';

import { Confetti } from '@/components/confetti';
import { PropsWithChildren, useState } from "react";

type DrawProps = PropsWithChildren<{
  code: string;
  assignedTo?: string | null;
  buttonLabel: string;
}>

export function Draw({ code, assignedTo, buttonLabel }: DrawProps) {
  const [drawnParticipant, setDrawnParticipant] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    const response = await fetch("/api/draw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      alert("Ошибка при выполнении жеребьёвки.")
      return
    }

    const data = await response.json() as { assignedTo: string }

    setTimeout(() => {
      setDrawnParticipant(data.assignedTo)
      setLoading(false)
    }, 2000)
  }

  if (assignedTo || drawnParticipant) {
    return (
      <>
        <p className={styles.result}>Тебе нужно подарить подарок <span className={styles.highlight}>{assignedTo || drawnParticipant}</span></p>
        {drawnParticipant && <Confetti id='confetti' className={styles.confetti} />}
      </>
    )
  }

  return (
    <div>
      <p className={styles.result}>Тебе ещё не выпал участник.</p>
      <div className={`${loading ? 'shake-slow shake-constant' : ''}`}>
        <button
          className={styles['draw-button']} 
          onClick={handleClick} 
          disabled={loading}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
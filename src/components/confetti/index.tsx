'use client'

import { useEffect, useState } from "react"
import { useReward } from "react-rewards"

type ConfettiProps = {
  id: string
  className: string
}

export function Confetti({ id, className }: ConfettiProps) {
  const [shouldHide, setShouldHide] = useState(false);

  const { reward } = useReward(
    'confetti', 
    'emoji', 
    { 
      emoji: ['🎄', '🎊', '🎁', '🧑‍🎄', '⛄', '❄️', '✨'],
      onAnimationComplete: () => setShouldHide(true),
    });

  useEffect(() => {
    reward()
  }, [reward])

  return <span id={id} className={className} style={{ display: shouldHide ? 'none' : 'inline' }} />
}
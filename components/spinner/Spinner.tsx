import clsx from 'clsx'
import { FC } from 'react'

import styles from './Spinner.module.scss'

interface SpinnerProps {
  className?: string
}

export default function Spinner({ className }: SpinnerProps) {
  return <div className={clsx(styles.loader, className)} />
}

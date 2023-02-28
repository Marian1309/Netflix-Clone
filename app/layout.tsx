import { ReactNode } from 'react'

import { GlobalWrapper } from '@utils'

import { jetbrains } from '@fonts'

import '../styles/globals.scss'

export const metadata = {
  title: 'Netflix',
  authors: { name: 'Marian', url: 'https://github.com/Marian1309' },
  description: 'netflix clone films',
  icons: { icon: '/icons/favicon.ico' }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' data-theme='halloween'>
      <body className={jetbrains.className}>
        <GlobalWrapper>{children}</GlobalWrapper>
      </body>
    </html>
  )
}

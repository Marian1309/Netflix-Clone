import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ name: string }>
) {
  if (req.method === 'GET') {
    res.status(200).json({ name: 'John Doe' })
  }
}

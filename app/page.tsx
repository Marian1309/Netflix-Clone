import { getServerSession } from 'next-auth'

export default async function HomePage() {
  const session = await getServerSession()
  console.log(session)
  return <>Netflix Clone</>
}

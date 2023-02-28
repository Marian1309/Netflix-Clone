# Suspense && lazy (Code splitting)

```js
import { Suspense, lazy, useState } from 'react'

const LazySpinner = lazy(() =>
  import('../../ui/spinner/Spinner').then((module) => {
    return { default: module.Spinner }
  })
)

const HomePage = () => {
  const [isLazy, setIsLazy] = useState < boolean > false

  return (
    <div className='m-8 inline-block cursor-pointer font-jetbrains text-primary hover:text-royalblue'>
      <Suspense>{isLazy ? <LazySpinner /> : 'Any Data'}</Suspense>

      <span onClick={() => setIsLazy(!isLazy)} className='ml-12'>
        Toggle
      </span>
    </div>
  )
}

export default HomePage
```

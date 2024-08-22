'use client'

import usePluggyConnect from 'use-pluggy-connect'

export default function OpenPluggyButton() {
  const { init } = usePluggyConnect({
    connectToken:
      '...',
  })

  return <button onClick={init}>Open Pluggy</button>
}

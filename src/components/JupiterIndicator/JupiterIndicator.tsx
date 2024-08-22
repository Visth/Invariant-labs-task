import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../JupiterIndicator/JupiterIndicator.css'

interface JupiterIndicatorProps {
  poolAddress: string
}

const JupiterIndicator: React.FC<JupiterIndicatorProps> = ({ poolAddress }) => {
  const [isIndexed, setIsIndexed] = useState<boolean>(false)

  useEffect(() => {
    const fetchIndexedPools = async () => {
      try {
        const response = await axios.get('https://cache.jup.ag/markets?v=3')
        const indexedPools = response.data

        const poolIsIndexed = indexedPools.some((pool: any) => pool.pubkey === poolAddress)

        setIsIndexed(poolIsIndexed)
      } catch (error) {
        console.error('Error fetching indexed pools:', error)
      }
    }

    fetchIndexedPools()
  }, [poolAddress])

  return (
    <>
      <div className={`glowing-icon ${isIndexed ? 'indexed' : ''}`} />
    </>
  )
}

export default JupiterIndicator

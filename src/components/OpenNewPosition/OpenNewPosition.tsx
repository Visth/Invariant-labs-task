import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JupiterIndicator from '@components/JupiterIndicator/JupiterIndicator';

interface Pool {
  pubkey: string;
  name: string;
}

const OpenNewPosition: React.FC = () => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const response = await axios.get('https://cache.jup.ag/markets?v=3');
        const indexedPools = response.data.map((pool: any) => ({
          pubkey: pool.pubkey,
          name: `Pool ${pool.pubkey.substring(0, 6)}...`,
        }));
        setPools(indexedPools);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching pools:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchPools();
  }, []);

  if (loading) return <div>Loading pools...</div>;
  if (error) return <div>Error loading pools</div>;

  return (
    <div>
      <h1>Open New Position</h1>
      <div>
        <h2>Available Pools:</h2>
        <ul>
          {pools.map((pool) => (
            <li key={pool.pubkey}>
              <div>
                <h3>{pool.name}</h3>
                <JupiterIndicator poolAddress={pool.pubkey} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OpenNewPosition;
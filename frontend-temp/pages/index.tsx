import { useEffect, useState } from 'react';
import Link from 'next/link';

type Match = {
  matchId: number;
  teamA: string;
  teamB: string;
};

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/matches') 
      .then(res => res.json())
      .then(setMatches);
  }, []);

  return (
    <div>
      <h1>Ongoing Matches</h1>
      {matches.map(match => (
        <div key={match.matchId}>
          <Link href={`/match/${match.matchId}`}>
            <strong>Match {match.matchId}</strong>: {match.teamA} vs {match.teamB}
          </Link>
        </div>
      ))}
    </div>
  );
}

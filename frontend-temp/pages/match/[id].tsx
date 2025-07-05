import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import socket from '../../lib/socket';

type Commentary = {
  over: number;
  ball: number;
  eventType: string;
  message: string;
};

type MatchDetails = {
  match: {
    teamA: string;
    teamB: string;
    matchId: number;
  };
  commentary: Commentary[];
};

export default function MatchPage() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<MatchDetails | null>(null);
  const [liveCommentary, setLiveCommentary] = useState<Commentary[]>([]);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/matches/${id}`)
      .then(res => res.json())
      .then(setData);
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const eventName = `match-${id}`;

    socket.on(eventName, (newComment: Commentary) => {
      setLiveCommentary(prev => [...prev, newComment]);
    });

    return () => {
      socket.off(eventName);
    };
  }, [id]);

  if (!data) return <div>Loading...</div>;

  const allCommentary = [...data.commentary, ...liveCommentary];

  return (
    <div>
      <h1>
        Match {data.match.matchId}: {data.match.teamA} vs {data.match.teamB}
      </h1>
      <h2>Live Commentary</h2>
      <ul>
        {allCommentary.map((c, i) => (
          <li key={i}>
            Over {c.over}.{c.ball} - [{c.eventType}] {c.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

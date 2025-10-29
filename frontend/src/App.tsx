
import './App.css'
import { useMatches } from './hooks/useMatches';

function App() {
  const { data: matches, isLoading, isError, error } = useMatches();


  return (
    <>
      <h1>Preview Matches</h1>
      {isLoading && <p>Loading matches...</p>}
      {isError && <p>Error loading matches: {(error as Error).message}</p>}
      {matches && (<div className='matchContainer'>
        {matches.map((match) => (
          <div key={match.id} className='matchRow'>
            <strong>{match.home_team.team_nickname} vs {match.away_team.team_nickname}</strong> - {match.start_time_datetime}
          </div>
        ))}
      </div>
      )}
    </>
  )
}

export default App

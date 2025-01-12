// src/App.jsx
import { useState } from 'react';
import { Game501 } from './components/Game501';

function App() {
  const [game, setGame] = useState('');

  const handleGameChoice = (gameType) => {
    setGame(gameType);
  };

  return (
    <div className="App">
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold">Dart Game</h1>
        <hr width="50%" className="border-b-2 border-gray-300 mx-auto my-5" />
        {!game &&

          <div className="mt-6">
          <button
            onClick={() => handleGameChoice('501')}
            className="mx-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
            >
            501
          </button>
          <button
            onClick={() => handleGameChoice('301')}
            className="mx-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
            >
            301
          </button>
          <button
            onClick={() => handleGameChoice('cricket')}
            className="mx-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
            >
            Cricket
          </button>
        </div>
          }

        {game === '501' && <Game501 />}
      </div>
    </div>
  );
}

export default App;

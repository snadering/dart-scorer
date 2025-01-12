export const GameChoice = ({ setGameChoice }) => {
    return (
      <div className="mt-10 space-y-4">
        <button
          onClick={() => setGameChoice('501')}
          className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded"
        >
          Play 501
        </button>
        <button
          onClick={() => setGameChoice('301')}
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
        >
          Play 301
        </button>
        <button
          onClick={() => setGameChoice('Cricket')}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Play Cricket
        </button>
      </div>
    );
  };
  
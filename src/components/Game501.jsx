import { useState } from "react";
import { Scoreboard } from "./Scoreboard";

export const Game501 = () => {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [scores, setScores] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [currentTeam, setCurrentTeam] = useState("");
  const [team1Darts, setTeam1Darts] = useState([]);
  const [team2Darts, setTeam2Darts] = useState([]);
  const [inactiveDarts, setInactiveDarts] = useState([]);
  const [multiplier, setMultiplier] = useState(null); // "Double" or "Triple"

  const dartboardNumbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25,
  ];

  const handleStartGame = () => {
    if (team1 && team2) {
      setScores({ [team1]: 501, [team2]: 501 });
      setCurrentTeam(team1);
      setGameStarted(true);
    }
  };

  const handleScoreInput = (score) => {
    const isTeam1 = currentTeam === team1;
    const currentDarts = isTeam1 ? team1Darts : team2Darts;

    // Apply multiplier if active
    let displayedScore = score;
    if (multiplier === "Double") {
      displayedScore = `D${score}`;
    } else if (multiplier === "Triple") {
      displayedScore = `T${score}`;
    }

    const updatedDarts = [...currentDarts, displayedScore];
    if (isTeam1) {
      setTeam1Darts(updatedDarts);
    } else {
      setTeam2Darts(updatedDarts);
    }

    setMultiplier(null); // Reset multiplier after using

    if (updatedDarts.length === 3) {
      const totalScore = updatedDarts.reduce((acc, dart) => {
        if (typeof dart === "string") {
          // Parse prefixed scores like "D20" or "T19"
          const prefix = dart.charAt(0);
          const value = parseInt(dart.slice(1), 10);
          if (prefix === "D") {
            return acc + value * 2;
          } else if (prefix === "T") {
            return acc + value * 3;
          }
        }
        return acc + (typeof dart === "number" ? dart : parseInt(dart, 10));
      }, 0);

      setScores((prevScores) => {
        const newScore = prevScores[currentTeam] - totalScore;
        if (newScore <= 0) {
          alert(`${currentTeam} wins!`);
          setGameStarted(false);
          return { ...prevScores, [currentTeam]: 501 }; // Reset score for the winner
        }
        return { ...prevScores, [currentTeam]: newScore };
      });

      setInactiveDarts(updatedDarts);
      if (isTeam1) {
        setTeam1Darts([]);
      } else {
        setTeam2Darts([]);
      }
      setCurrentTeam(isTeam1 ? team2 : team1);
    } else if (inactiveDarts.length > 0) {
      setInactiveDarts([]);
    }
  };

  const handleMultiplier = (type) => {
    setMultiplier((prev) => (prev === type ? null : type));
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 text-center">
      {!gameStarted ? (
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Team Names</h2>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Team 1"
              className="w-full max-w-sm px-4 py-2 rounded border border-gray-300"
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Team 2"
              className="w-full max-w-sm px-4 py-2 rounded border border-gray-300"
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
            />
          </div>
          <button
            onClick={handleStartGame}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded w-full sm:w-auto"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Game in Progress
          </h2>
          <Scoreboard
            team1={team1}
            team2={team2}
            scores={scores}
            currentTeam={currentTeam}
          />
          <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className={`w-full sm:w-32 bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-2 px-4 rounded ${
                multiplier === "Triple" ? "opacity-50 cursor-not-allowed" : ""
              } ${multiplier === "Double" ? "bg-green-700" : ""}`}
              onClick={() => handleMultiplier("Double")}
              disabled={multiplier === "Triple"}
            >
              Double
            </button>
            <button
              className={`w-full sm:w-32 bg-red-500 hover:bg-red-600 text-white text-lg font-bold py-2 px-4 rounded ${
                multiplier ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleScoreInput(0)}
              disabled={!!multiplier}
            >
              Miss
            </button>
            <button
              className={`w-full sm:w-32 bg-purple-500 hover:bg-purple-600 text-white text-lg font-bold py-2 px-4 rounded ${
                multiplier === "Double" ? "opacity-50 cursor-not-allowed" : ""
              } ${multiplier === "Triple" ? "bg-purple-700" : ""}`}
              onClick={() => handleMultiplier("Triple")}
              disabled={multiplier === "Double"}
            >
              Triple
            </button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-4 mt-6">
            {dartboardNumbers.map((number) => (
              <button
                key={number}
                className={`bg-gray-300 hover:bg-gray-400 text-lg font-bold py-2 px-4 rounded-full ${
                  multiplier === "Triple" && number === 25
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => handleScoreInput(number)}
                disabled={multiplier === "Triple" && number === 25}
              >
                {number}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex justify-center mt-4">
              <div className="w-full max-w-md bg-gray-100 rounded-lg shadow-md flex items-center justify-around p-4 border border-gray-300">
                {inactiveDarts.length > 0
                  ? inactiveDarts.map((dart, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 bg-gray-400 text-white text-xl font-bold flex items-center justify-center rounded-lg"
                      >
                        {dart}
                      </div>
                    ))
                  : (currentTeam === team1 ? team1Darts : team2Darts).map(
                      (dart, index) => (
                        <div
                          key={index}
                          className={`w-16 h-16 text-white text-xl font-bold flex items-center justify-center rounded-lg ${
                            dart === 0 ? "bg-red-600" : "bg-green-600"
                          }`}
                        >
                          {dart}
                        </div>
                      )
                    )}
                {[
                  ...Array(
                    3 -
                      (inactiveDarts.length > 0
                        ? inactiveDarts.length
                        : currentTeam === team1
                        ? team1Darts.length
                        : team2Darts.length)
                  ),
                ].map((_, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 bg-gray-300 text-gray-600 text-xl font-bold flex items-center justify-center rounded-lg"
                  >
                    -
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

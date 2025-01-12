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
      score *= 2;
    } else if (multiplier === "Triple") {
      displayedScore = `T${score}`;
      score *= 3;
    }

    const updatedDarts = [...currentDarts, displayedScore];
    if (isTeam1) {
      setTeam1Darts(updatedDarts);
    } else {
      setTeam2Darts(updatedDarts);
    }

    setMultiplier(null); // Reset multiplier after using

    if (updatedDarts.length === 3) {
      const totalScore = updatedDarts.reduce(
        (acc, curr) =>
          acc +
          (typeof curr === "string" ? parseInt(curr.slice(1)) : curr), // Extract numeric value
        0
      );

      setScores((prevScores) => {
        const newScore = prevScores[currentTeam] - totalScore;
        if (newScore <= 0) {
          alert(`${currentTeam} wins!`);
          setGameStarted(false);
          return { ...prevScores, [currentTeam]: 501 };
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
    setMultiplier(type);
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center">
      {!gameStarted ? (
        <div>
          <h2 className="text-3xl">Team Names</h2>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Team 1"
              className="px-4 py-2 rounded border border-gray-300"
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Team 2"
              className="px-4 py-2 rounded border border-gray-300"
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
            />
          </div>
          <button
            onClick={handleStartGame}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl mb-6">Game in Progress</h2>
          <Scoreboard
            team1={team1}
            team2={team2}
            scores={scores}
            currentTeam={currentTeam}
          />
          <div className="mt-4">
            <button
              className={`bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-4 ${
                multiplier === "Triple" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleMultiplier("Double")}
              disabled={multiplier === "Triple"}
            >
              Double
            </button>
            <button
              className={`bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded ${
                multiplier === "Double" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleMultiplier("Triple")}
              disabled={multiplier === "Double"}
            >
              Triple
            </button>
          </div>
          <div className="grid grid-cols-7 gap-4 mt-6">
            {dartboardNumbers.map((number) => (
              <button
                key={number}
                className="bg-gray-300 hover:bg-gray-400 text-xl font-bold py-2 px-4 rounded-full"
                onClick={() => handleScoreInput(number)}
              >
                {number}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex justify-center mt-4">
              <div className="w-64 h-24 bg-gray-100 rounded-lg shadow-md flex items-center justify-around p-4 border border-gray-300">
                {inactiveDarts.length > 0
                  ? inactiveDarts.map((dart, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 bg-gray-400 text-white text-2xl font-bold flex items-center justify-center rounded-lg"
                      >
                        {dart}
                      </div>
                    ))
                  : (currentTeam === team1 ? team1Darts : team2Darts).map(
                      (dart, index) => (
                        <div
                          key={index}
                          className="w-16 h-16 bg-green-600 text-white text-2xl font-bold flex items-center justify-center rounded-lg"
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
                    className="w-16 h-16 bg-gray-300 text-gray-600 text-2xl font-bold flex items-center justify-center rounded-lg"
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

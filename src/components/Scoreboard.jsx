export const Scoreboard = ({ team1, team2, scores, currentTeam }) => {
  const isTeam1Turn = currentTeam === team1;
  const isTeam2Turn = currentTeam === team2;

  const baseStyle =
    "w-1/3 text-center p-4 border rounded-lg transition-all duration-300";
  const activeStyle = "bg-blue-300 shadow-lg scale-105";
  const inactiveStyle = "bg-gray-100";

  return (
    <div className="flex justify-between mt-6">
      <div
        className={`${baseStyle} ${isTeam1Turn ? activeStyle : inactiveStyle}`}
      >
        <h3 className="text-lg font-bold">{team1}</h3>
        <p className="text-3xl">{scores[team1]}</p>
      </div>
      <div
        className={`${baseStyle} ${isTeam2Turn ? activeStyle : inactiveStyle}`}
      >
        <h3 className="text-lg font-bold">{team2}</h3>
        <p className="text-3xl">{scores[team2]}</p>
      </div>
    </div>
  );
};

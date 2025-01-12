// src/utils/gameLogic.js
export const parseScore = (scoreInput, remainingScore) => {
    const scorePattern = /(T|D)?(0|[1-9]|1[0-9]|20|25)/g;
    const scores = scoreInput.split(" ");
    
    let totalScore = 0;
    scores.forEach(score => {
      const match = score.match(scorePattern);
      if (match) {
        const multiplier = match[1] === "T" ? 3 : match[1] === "D" ? 2 : 1;
        const value = parseInt(match[2]);
        totalScore += multiplier * value;
      }
    });
    return totalScore;
  };
  
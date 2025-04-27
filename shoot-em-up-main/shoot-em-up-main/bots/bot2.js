
export default function Bot2(history, self, opponent) {
    // Basic logic: if opponent has shot last round, block; else reload or shoot randomly
    const lastRound = history[history.length - 1];
    if (lastRound) {
      const opponentLast = lastRound.results.find(r => r.name === opponent.name);
      if (opponentLast?.choice === "Shoot") {
        return "Block";
      }
    }
  
    // Random between reload or shoot if you have ammo
    if (self.ammo > 0 && Math.random() > 0.5) {
      return "Shoot";
    }
    return "Reload";
  }
  
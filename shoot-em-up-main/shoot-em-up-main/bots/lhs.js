export default function leeharveyoswald(history, self, opponent) {
    if (opponent.ammo >= 1) {
      return "Block";
    }
     else if (self.ammo == 0){
      return "Reload";
    }
    else {
      return "Shoot"
    }
  }
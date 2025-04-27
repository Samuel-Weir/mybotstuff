export default function gamblingman(history, self, opponent) {
    let strategies = [
        function strategy1() {
          if (self.ammo == 0) {
            return "Reload";
          } else {
            return "Shoot";
          }
        },
        function strategy2() {
          if (opponent.ammo >= 1) {
            return "Block";
          } else if (self.ammo == 0) {
            return "Reload";
          } else {
            return "Shoot";
          }
        }
      ];
    
    
      let gambled = strategies[Math.floor(Math.random() * strategies.length)];
      return gambled(); 
  }
// logging.js
export function addLoggingToSpriteOrStage(object) {
    object.logCurrentState = function() {
      const currentTime = new Date().toISOString();
      const costumeName = this.costume ? this.costume.name : "No Costume";
      const soundsList = this.sounds ? this.sounds.map(s => s.name).join(", ") : "No Sounds";
      console.log(`[${currentTime}] Object: ${this.constructor.name}, Costume: ${costumeName}, Sounds: ${soundsList}`);
    };
  
    // If there are other methods that change the state, add the logging call to those methods here.
    // Example (this should be adjusted based on actual implementation):
    const originalSetCostume = object.setCostume;
    object.setCostume = function(...args) {
      originalSetCostume.apply(this, args);
      this.logCurrentState();
    };
}
  
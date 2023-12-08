export class Project {
    constructor() {
      this.targets = [];
    }
  
    addTarget(target) {
      this.targets.push(target);
    }
    
    buildAST() {
      return {
        type: 'Project',
        targets: this.targets.map(target => target.buildAST())
      };
    }
 }
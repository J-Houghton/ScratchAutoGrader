export class Block {
    constructor(data) {
        this.opcode = data.opcode;
        this.next = data.next;
        this.parent = data.parent;
        this.inputs = data.inputs;
        this.fields = data.fields;
        // Other properties...
    }

    setInputs(inputs) {
        this.inputs = inputs;
    }

    buildAST() {
        return {
          //type: 'Block',
          opcode: this.opcode,
          next: this.next,
          parent: this.parent,
          inputs: this.inputs,
          fields: this.fields
        };
    }
    // Other methods...
}
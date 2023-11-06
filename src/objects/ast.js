export class Node {
    constructor(type, data, parent = null) {
        this.type = type;
        this.data = data;
        this.parent = parent; // Reference to the parent Node
        this.children = []; // An array of child Nodes
    }

    addChild(node) {
        node.parent = this; // Set this node as the parent of the new child
        this.children.push(node);
    }

    getSiblings() {
        return this.parent.children.filter(child => child !== this);
    }

    getRoot() { 
        if (this.parent === null) {
            return this;
        } else {
            return this.parent.getRoot();
        }
    }
    // No need for a 'getParent' method as we can directly access the 'parent' property of a Node
    //getPath
    //getSubtree
    getTarget() {
        if (this.type === 'Target') {
            return this.data;
        } else {
            return this.parent.getTarget();
        }
    }
    
    toJSON() {
        // We're not serializing the 'parent' field here to avoid circular references in the resulting JSON
        return {
            type: this.type,
            data: this.data, // Assumes 'data' is JSON-serializable
            children: this.children.map(child => child.toJSON())
        };
    }
}

export class AST {
    constructor(root) {
        if (root.type !== 'Project') {
            throw new Error('Root node must be of type "Project"');
        }

        this.root = root; // The root Node of the AST, which should have no parent
    }

    toJSON() {
        return this.root.toJSON(); // Convert root Node to a JSON-serializable object
    }
    
    //usage: findNode, starting from root, to find desired opcode string
    /*const ast = new AST(rootNode);
    const foundNode = ast.findNode(node => node.data.opcode === "desired_opcode");*/
    findNode(callback, node = this.root) {
        // Check the current node
        if (callback(node)) {
            return node;
        }

        // Recurse through children
        for (let child of node.children) {
            const result = this.findNode(callback, child);
            if (result) return result;
        }

        return null; // Return null if no matching node is found
    }

    findAllNodes(callback, node = this.root, nodes = []) {
        // Check the current node
        if (callback(node)) {
            nodes.push(node);
        }

        // Recursively check the children
        for (const child of node.children) {
            this.findAllNodes(callback, child, nodes);
        }

        return nodes;
    }
}

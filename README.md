To run, npm start sb3File/name.sb3

# Scratch Autograder
## Introduction

The Scratch Program Autograder is a software tool developed to automate the evaluation of Scratch projects submitted by students. This README document provides an overview of the program, its functionalities, and how to use it.
Features
1. Library of Functions

The Scratch Program Autograder provides a comprehensive library of functions that allow instructors to process and evaluate Scratch projects efficiently. These functions enable the verification of assignment submissions against predefined expectations.

2. Parsing .sb3 Files

Our autograder has the capability to parse Scratch projects saved in the .sb3 file format. This enables us to access the Abstract Syntax Tree (AST) within the project file, providing the foundation for detailed evaluation.

3. Querying AST

Instructors can search and analyze the AST using the following features:

    Search by Kind: Find specific blocks by their type (e.g., "if...then").
    Search by Kind and Input Values: Locate blocks based on both their type and specific input values (e.g., "Repeat 10 times").

4. Accessing Subtrees

The autograder allows easy access to subtree information under a queried block, providing:

    Block Type: Identifies the type of the block (e.g., "Move To X Y" or "Next Costume").
    Children Blocks: Retrieves the subtree of children blocks attached below the selected block.
    Parent Block Reference: Establishes a link to the parent block to which the current block is attached.
    Contained Blocks: For control (C) blocks, it provides access to the subtree of contained blocks.
    Input Field Values: Retrieves values of input fields for blocks (e.g., number of repeats in a "Repeat N Times" block or operands in an "A + B" block).

5. Music Block Evaluation

Our autograder can determine if a sequence of music blocks exists and evaluates the correctness of notes in terms of pitch and duration. This evaluation accommodates complex scenarios, such as chords and inline math expressions.
6. Sprite Position Tracking

The autograder can track the position of sprites at specific points along the AST. For example, it can calculate the absolute position of a sprite after a series of actions (e.g., "Change Y by 10" followed by "Change X by 10").
7. Providing Feedback

Instructors can provide feedback to students using the following methods:

    Written Feedback: Send detailed written feedback to students through the system out and/or system error streams.
    Scoring: Indicate the score using the program exit code (0 for no points, 1 for full points).
    Partial Points: Submit partial points via a GET request to a specified URL. Use the environment variable CODIO_PARTIAL_POINTS_URL with a query string of "points=[value]" to communicate awarded points.

## Getting Started

To get started with the Scratch Program Autograder, follow these steps:

    Installation: Clone this repository to your local machine and install the necessary dependencies (provide installation instructions if needed).

    Usage: Describe how to use the autograder in your specific development environment. Include code examples and usage scenarios.

    Configuration: Explain any configuration settings, environment variables, or input file formats required for the autograder to work correctly.

    Testing: Provide guidance on how to test the autograder with sample Scratch projects and expected outcomes.

    Feedback Reporting: Specify how errors or issues with the autograder should be reported and include contact information.

## Dependencies

    List any external libraries, packages, or software dependencies that are required to run the Scratch Program Autograder.
Contributors

    

## License

    Specify the license under which this software is distributed. Acknowledgments If your autograder is built upon existing work or libraries, acknowledge and provide credits to the original authors or projects. List the contributors to this project and their roles.
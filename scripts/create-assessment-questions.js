const mongoose = require('mongoose');
const { Assessment } = require('../server/database/models/Assessment');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/it-ojt-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Programming Questions (10)
const programmingQuestions = [
  {
    question: "What is the main difference between a compiled and an interpreted language?",
    type: "multiple-choice",
    options: ["Interpreted languages are faster than compiled ones", "Compiled languages require a compiler before execution", "Interpreted languages don't need any software to run", "Compiled languages are only for web applications"],
    correctAnswer: "Compiled languages require a compiler before execution",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "Compiled languages need to be translated into machine code before execution."
  },
  {
    question: "What is an algorithm?",
    type: "multiple-choice",
    options: ["A computer language", "A set of step-by-step instructions to solve a problem", "A type of compiler", "A debugging process"],
    correctAnswer: "A set of step-by-step instructions to solve a problem",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "An algorithm is a sequence of steps to solve a problem."
  },
  {
    question: "Which of the following is a linear data structure?",
    type: "multiple-choice",
    options: ["Tree", "Graph", "Queue", "Hash Table"],
    correctAnswer: "Queue",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "Queue is a linear data structure that follows FIFO."
  },
  {
    question: "What is recursion?",
    type: "multiple-choice",
    options: ["A process of looping through data structures", "A function that calls itself", "An error handling mechanism", "A database query"],
    correctAnswer: "A function that calls itself",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "Recursion is a function calling itself to solve problems."
  },
  {
    question: "Which of the following represents the LIFO (Last In, First Out) principle?",
    type: "multiple-choice",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: "Stack",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "Stack follows LIFO principle."
  },
  {
    question: "Which of these is NOT a data type?",
    type: "multiple-choice",
    options: ["Integer", "Boolean", "While", "String"],
    correctAnswer: "While",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "While is a loop construct, not a data type."
  },
  {
    question: "What is an example of an object-oriented programming language?",
    type: "multiple-choice",
    options: ["C", "HTML", "Python", "SQL"],
    correctAnswer: "Python",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "Python supports object-oriented programming."
  },
  {
    question: "What is the purpose of functions?",
    type: "multiple-choice",
    options: ["To create loops", "To store data", "To make code reusable and organized", "To connect to databases"],
    correctAnswer: "To make code reusable and organized",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "Functions help in code reusability and organization."
  },
  {
    question: "Which of the following is a conditional statement?",
    type: "multiple-choice",
    options: ["for loop", "while loop", "if-else", "function"],
    correctAnswer: "if-else",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "if-else is a conditional statement."
  },
  {
    question: "What does IDE stand for?",
    type: "multiple-choice",
    options: ["Integrated Development Environment", "Internal Debugging Engine", "Internet Development Extension", "Integrated Data Editor"],
    correctAnswer: "Integrated Development Environment",
    difficulty: "easy",
    category: "programming",
    points: 1,
    explanation: "IDE stands for Integrated Development Environment."
  }
];

// Database Questions (10)
const databaseQuestions = [
  {
    question: "What is a database?",
    type: "multiple-choice",
    options: ["A collection of algorithms", "A system for storing and organizing data", "A programming language", "A network device"],
    correctAnswer: "A system for storing and organizing data",
    difficulty: "easy",
    category: "database",
    points: 1,
    explanation: "A database is a system for storing and organizing data."
  },
  {
    question: "What is a primary key?",
    type: "multiple-choice",
    options: ["A field that uniquely identifies each record", "A secondary storage method", "A password for accessing data", "A duplicate record identifier"],
    correctAnswer: "A field that uniquely identifies each record",
    difficulty: "easy",
    category: "database",
    points: 1,
    explanation: "A primary key uniquely identifies each record."
  },
  {
    question: "SQL stands for:",
    type: "multiple-choice",
    options: ["Standard Query Language", "Structured Query Language", "Simple Query Language", "Sequential Query Logic"],
    correctAnswer: "Structured Query Language",
    difficulty: "easy",
    category: "database",
    points: 1,
    explanation: "SQL stands for Structured Query Language."
  },
  {
    question: "Which SQL command retrieves data?",
    type: "multiple-choice",
    options: ["INSERT", "DELETE", "SELECT", "UPDATE"],
    correctAnswer: "SELECT",
    difficulty: "easy",
    category: "database",
    points: 1,
    explanation: "SELECT retrieves data from a database."
  },
  {
    question: "What does normalization do?",
    type: "multiple-choice",
    options: ["Adds redundant data", "Organizes data to reduce redundancy", "Deletes all data", "Converts tables to JSON format"],
    correctAnswer: "Organizes data to reduce redundancy",
    difficulty: "easy",
    category: "database",
    points: 1,
    explanation: "Normalization reduces redundancy in data."
  },
  {
    question: "What is a foreign key used for?",
    type: "multiple-choice",
    options: ["Encrypting data", "Linking tables", "Creating indexes", "Updating values"],
    correctAnswer: "Linking tables",
    difficulty: "easy",
    category: "database",
    points: 1,
    explanation: "Foreign keys link tables in a database."
  },
  {
    question: "Which database is an example of NoSQL?",
    type: "multiple-choice",
    options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
    correctAnswer: "MongoDB",
    difficulty: "easy",
    category: "database",
    points: 1,
    explanation: "MongoDB is a NoSQL database."
  },
  {
    question: "Which command removes all records from a table permanently?",
    type: "multiple-choice",
    options: ["DROP", "DELETE", "REMOVE", "CLEAR"],
    correctAnswer: "DROP",
    difficulty: "easy",
    category: "database",
    points: 1,
    explanation: "DROP removes all records permanently."
  },
  {
    question: "What is an index in a database?",
    type: "multiple-choice",
    options: ["A security feature", "A way to speed up data retrieval", "A data entry form", "A type of backup"],
    correctAnswer: "A way to speed up data retrieval",
    difficulty: "easy",
    category: "database",
    points: 1,
    explanation: "An index speeds up data retrieval."
  },
  {
    question: "Which of these is a relational database?",
    type: "multiple-choice",
    options: ["Firebase", "MySQL", "Neo4j", "Cassandra"],
    correctAnswer: "MySQL",
    difficulty: "easy",
    category: "database",
    points: 1,
    explanation: "MySQL is a relational database."
  }
];

// Web Development Questions (10)
const webDevelopmentQuestions = [
  {
    question: "What does HTML stand for?",
    type: "multiple-choice",
    options: ["Hyper Trainer Markup Language", "HyperText Markup Language", "HyperText Machine Language", "Hyper Tool Multi Language"],
    correctAnswer: "HyperText Markup Language",
    difficulty: "easy",
    category: "webDevelopment",
    points: 1,
    explanation: "HTML stands for HyperText Markup Language."
  },
  {
    question: "What is CSS used for?",
    type: "multiple-choice",
    options: ["Structuring web content", "Adding style and layout to web pages", "Handling server requests", "Writing database queries"],
    correctAnswer: "Adding style and layout to web pages",
    difficulty: "easy",
    category: "webDevelopment",
    points: 1,
    explanation: "CSS is used for styling and layout."
  },
  {
    question: "JavaScript is mainly used for:",
    type: "multiple-choice",
    options: ["Designing graphics", "Adding interactivity to web pages", "Creating server hardware", "Managing databases"],
    correctAnswer: "Adding interactivity to web pages",
    difficulty: "easy",
    category: "webDevelopment",
    points: 1,
    explanation: "JavaScript adds interactivity to web pages."
  },
  {
    question: "What does 'responsive design' mean?",
    type: "multiple-choice",
    options: ["A website that loads quickly", "A website that adjusts layout for all screen sizes", "A website with interactive buttons", "A website that responds to emails"],
    correctAnswer: "A website that adjusts layout for all screen sizes",
    difficulty: "easy",
    category: "webDevelopment",
    points: 1,
    explanation: "Responsive design adjusts to different screen sizes."
  },
  {
    question: "Which of the following is a frontend framework?",
    type: "multiple-choice",
    options: ["Laravel", "React", "Django", "Node.js"],
    correctAnswer: "React",
    difficulty: "easy",
    category: "webDevelopment",
    points: 1,
    explanation: "React is a frontend framework."
  },
  {
    question: "What is the role of a backend developer?",
    type: "multiple-choice",
    options: ["Design user interfaces", "Handle server logic and database interactions", "Write CSS", "Edit images"],
    correctAnswer: "Handle server logic and database interactions",
    difficulty: "easy",
    category: "webDevelopment",
    points: 1,
    explanation: "Backend developers handle server logic and databases."
  },
  {
    question: "What does API stand for?",
    type: "multiple-choice",
    options: ["Application Programming Interface", "Advanced Programming Integration", "Applied Program Interaction", "Automated Process Interface"],
    correctAnswer: "Application Programming Interface",
    difficulty: "easy",
    category: "webDevelopment",
    points: 1,
    explanation: "API stands for Application Programming Interface."
  },
  {
    question: "Which protocol is used for secure web communication?",
    type: "multiple-choice",
    options: ["HTTP", "HTTPS", "FTP", "SMTP"],
    correctAnswer: "HTTPS",
    difficulty: "easy",
    category: "webDevelopment",
    points: 1,
    explanation: "HTTPS is used for secure web communication."
  },
  {
    question: "What is the purpose of Git?",
    type: "multiple-choice",
    options: ["Manage website layout", "Version control", "Debugging", "Data storage"],
    correctAnswer: "Version control",
    difficulty: "easy",
    category: "webDevelopment",
    points: 1,
    explanation: "Git is used for version control."
  },
  {
    question: "Which tag is used to insert an image in HTML?",
    type: "multiple-choice",
    options: ["<img>", "<src>", "<image>", "<pic>"],
    correctAnswer: "<img>",
    difficulty: "easy",
    category: "webDevelopment",
    points: 1,
    explanation: "The <img> tag is used to insert images in HTML."
  }
];

// Networking Questions (10)
const networkingQuestions = [
  {
    question: "What does IP stand for in networking?",
    type: "multiple-choice",
    options: ["Internet Protocol", "Internal Protocol", "Information Protocol", "Integrated Protocol"],
    correctAnswer: "Internet Protocol",
    difficulty: "easy",
    category: "networking",
    points: 1,
    explanation: "IP stands for Internet Protocol, which handles addressing and routing of data packets."
  },
  {
    question: "What is the purpose of a router?",
    type: "multiple-choice",
    options: ["To connect devices within a network", "To route data between different networks", "To store data temporarily", "To provide power to devices"],
    correctAnswer: "To route data between different networks",
    difficulty: "easy",
    category: "networking",
    points: 1,
    explanation: "A router routes data packets between different networks."
  },
  {
    question: "What does TCP stand for?",
    type: "multiple-choice",
    options: ["Transmission Control Protocol", "Transfer Control Protocol", "Transport Communication Protocol", "Terminal Control Protocol"],
    correctAnswer: "Transmission Control Protocol",
    difficulty: "easy",
    category: "networking",
    points: 1,
    explanation: "TCP stands for Transmission Control Protocol."
  },
  {
    question: "What is a subnet mask used for?",
    type: "multiple-choice",
    options: ["To identify the network portion of an IP address", "To encrypt network traffic", "To assign IP addresses", "To measure network speed"],
    correctAnswer: "To identify the network portion of an IP address",
    difficulty: "easy",
    category: "networking",
    points: 1,
    explanation: "A subnet mask identifies the network and host portions of an IP address."
  },
  {
    question: "What is the default port for HTTP?",
    type: "multiple-choice",
    options: ["21", "22", "80", "443"],
    correctAnswer: "80",
    difficulty: "easy",
    category: "networking",
    points: 1,
    explanation: "HTTP uses port 80 by default."
  },
  {
    question: "What does DNS stand for?",
    type: "multiple-choice",
    options: ["Domain Name System", "Dynamic Network Service", "Data Network Server", "Direct Network Switch"],
    correctAnswer: "Domain Name System",
    difficulty: "easy",
    category: "networking",
    points: 1,
    explanation: "DNS stands for Domain Name System."
  },
  {
    question: "What is a firewall used for?",
    type: "multiple-choice",
    options: ["To speed up network connections", "To monitor and control network traffic", "To assign IP addresses", "To store network data"],
    correctAnswer: "To monitor and control network traffic",
    difficulty: "easy",
    category: "networking",
    points: 1,
    explanation: "A firewall monitors and controls incoming and outgoing network traffic."
  },
  {
    question: "What is the difference between TCP and UDP?",
    type: "multiple-choice",
    options: ["TCP is faster than UDP", "TCP is connection-oriented, UDP is connectionless", "UDP is more secure than TCP", "TCP only works on local networks"],
    correctAnswer: "TCP is connection-oriented, UDP is connectionless",
    difficulty: "easy",
    category: "networking",
    points: 1,
    explanation: "TCP provides reliable, connection-oriented communication, while UDP is connectionless."
  },
  {
    question: "What is a MAC address?",
    type: "multiple-choice",
    options: ["A unique identifier for network interfaces", "An IP address for mobile devices", "A password for network access", "A type of network cable"],
    correctAnswer: "A unique identifier for network interfaces",
    difficulty: "easy",
    category: "networking",
    points: 1,
    explanation: "A MAC address is a unique identifier assigned to network interfaces."
  },
  {
    question: "What does VPN stand for?",
    type: "multiple-choice",
    options: ["Virtual Private Network", "Very Private Network", "Virtual Public Network", "Verified Private Network"],
    correctAnswer: "Virtual Private Network",
    difficulty: "easy",
    category: "networking",
    points: 1,
    explanation: "VPN stands for Virtual Private Network."
  }
];

// Problem Solving Questions (10)
const problemSolvingQuestions = [
  {
    question: "What is an algorithm?",
    type: "multiple-choice",
    options: ["A programming language", "A step-by-step solution to a problem", "A type of computer", "A software application"],
    correctAnswer: "A step-by-step solution to a problem",
    difficulty: "easy",
    category: "problemSolving",
    points: 1,
    explanation: "An algorithm is a step-by-step procedure for solving a problem or completing a task."
  },
  {
    question: "What is debugging?",
    type: "multiple-choice",
    options: ["Writing new code", "Finding and fixing errors in code", "Designing user interfaces", "Optimizing performance"],
    correctAnswer: "Finding and fixing errors in code",
    difficulty: "easy",
    category: "problemSolving",
    points: 1,
    explanation: "Debugging involves identifying and resolving bugs in software."
  },
  {
    question: "What does 'divide and conquer' mean in problem solving?",
    type: "multiple-choice",
    options: ["Splitting a problem into smaller, manageable parts", "Conquering competitors", "Dividing resources equally", "Conquering new markets"],
    correctAnswer: "Splitting a problem into smaller, manageable parts",
    difficulty: "easy",
    category: "problemSolving",
    points: 1,
    explanation: "Divide and conquer breaks complex problems into simpler subproblems."
  },
  {
    question: "What is a flowchart used for?",
    type: "multiple-choice",
    options: ["Writing code", "Visualizing the flow of a process or algorithm", "Storing data", "Creating graphics"],
    correctAnswer: "Visualizing the flow of a process or algorithm",
    difficulty: "easy",
    category: "problemSolving",
    points: 1,
    explanation: "Flowcharts represent the steps and decisions in a process."
  },
  {
    question: "What is pseudocode?",
    type: "multiple-choice",
    options: ["Fake code that doesn't work", "Informal description of an algorithm", "Encrypted code", "Code written in another language"],
    correctAnswer: "Informal description of an algorithm",
    difficulty: "easy",
    category: "problemSolving",
    points: 1,
    explanation: "Pseudocode is a high-level description of an algorithm using natural language."
  },
  {
    question: "What is the first step in problem solving?",
    type: "multiple-choice",
    options: ["Write code", "Understand the problem", "Test the solution", "Document the code"],
    correctAnswer: "Understand the problem",
    difficulty: "easy",
    category: "problemSolving",
    points: 1,
    explanation: "Understanding the problem is crucial before attempting to solve it."
  },
  {
    question: "What is a test case?",
    type: "multiple-choice",
    options: ["A bug in the code", "A set of inputs and expected outputs to verify code", "A type of algorithm", "A debugging tool"],
    correctAnswer: "A set of inputs and expected outputs to verify code",
    difficulty: "easy",
    category: "problemSolving",
    points: 1,
    explanation: "Test cases help verify that code works correctly."
  },
  {
    question: "What does 'edge case' mean?",
    type: "multiple-choice",
    options: ["A case that is always true", "Unusual or extreme input scenarios", "The best case scenario", "A case that is never reached"],
    correctAnswer: "Unusual or extreme input scenarios",
    difficulty: "easy",
    category: "problemSolving",
    points: 1,
    explanation: "Edge cases are inputs that are at the boundaries of expected input ranges."
  },
  {
    question: "What is refactoring?",
    type: "multiple-choice",
    options: ["Rewriting code from scratch", "Improving code structure without changing functionality", "Adding new features", "Removing code"],
    correctAnswer: "Improving code structure without changing functionality",
    difficulty: "easy",
    category: "problemSolving",
    points: 1,
    explanation: "Refactoring improves code quality without altering its behavior."
  },
  {
    question: "What is the purpose of comments in code?",
    type: "multiple-choice",
    options: ["To make code run faster", "To explain what the code does", "To hide code from others", "To create backups"],
    correctAnswer: "To explain what the code does",
    difficulty: "easy",
    category: "problemSolving",
    points: 1,
    explanation: "Comments help others understand the code's purpose and logic."
  }
];

const createAssessments = async () => {
  try {
    console.log('Creating comprehensive assessments...');

    // Check if assessments already exist
    const existingAssessments = await Assessment.find();
    if (existingAssessments.length > 0) {
      console.log('Assessments already exist. Deleting existing assessments...');
      await Assessment.deleteMany({});
    }

    // Create comprehensive assessment with all categories
    const allQuestions = [
      ...programmingQuestions,
      ...databaseQuestions,
      ...webDevelopmentQuestions,
      ...networkingQuestions,
      ...problemSolvingQuestions
    ];

    // Shuffle all questions to mix categories
    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    shuffle(allQuestions);

    const assessments = [
      {
        title: 'IT Skills Assessment',
        description: 'Comprehensive evaluation of IT skills across programming, databases, web development, networking, and problem-solving',
        questions: allQuestions,
        timeLimit: 60, // 60 minutes for 50 questions
        passingScore: 60,
        totalPoints: allQuestions.reduce((sum, q) => sum + q.points, 0),
        category: 'general',
        isActive: true
      }
    ];

    // Create assessments
    for (const assessmentData of assessments) {
      const assessment = await Assessment.create(assessmentData);
      console.log(`✓ Created ${assessment.title} with ${assessment.questions.length} questions`);
    }

    console.log('\n=== Assessment Creation Complete ===');
    console.log('Total assessments created: 2');
    console.log('Programming questions: 10');
    console.log('Database questions: 10');
    console.log('Time limits: Programming (30 min), Database (30 min)');
    console.log('Passing score: 70%');
    console.log('=====================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error creating assessments:', error);
    process.exit(1);
  }
};

createAssessments();

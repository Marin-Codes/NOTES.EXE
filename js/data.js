// ═══════════════════════════════════════════
// NOTES.EXE — DATA MODULE
// Sample data for the student notes platform
// ═══════════════════════════════════════════

const SEMESTERS = [
  { id: 1, name: "Semester 1", icon: "📁" },
  { id: 2, name: "Semester 2", icon: "📁" },
  { id: 3, name: "Semester 3", icon: "📁" },
  { id: 4, name: "Semester 4", icon: "📁" },
  { id: 5, name: "Semester 5", icon: "📁" },
  { id: 6, name: "Semester 6", icon: "📁" },
];

const SUBJECTS = [
  // Semester 3
  { id: "dbms", name: "Database Management Systems", semester: 3, icon: "🗄️", abbr: "DBMS" },
  { id: "adv-python", name: "Advanced Python", semester: 3, icon: "🐍", abbr: "PYTHON" },
  { id: "math3", name: "Mathematics III", semester: 3, icon: "📐", abbr: "MATH" },
  { id: "stats", name: "Statistics", semester: 3, icon: "📊", abbr: "STATS" },
  { id: "r-prog", name: "R Programming", semester: 3, icon: "📈", abbr: "R" },
  // Semester 4
  { id: "os", name: "Operating Systems", semester: 4, icon: "💻", abbr: "OS" },
  { id: "dsa", name: "Data Structures & Algorithms", semester: 4, icon: "🌳", abbr: "DSA" },
  { id: "web-dev", name: "Web Development", semester: 4, icon: "🌐", abbr: "WEBDEV" },
  { id: "ml-basics", name: "Machine Learning Basics", semester: 4, icon: "🤖", abbr: "ML" },
  // Semester 5
  { id: "cn", name: "Computer Networks", semester: 5, icon: "🔗", abbr: "CN" },
  { id: "se", name: "Software Engineering", semester: 5, icon: "⚙️", abbr: "SE" },
  { id: "cloud", name: "Cloud Computing", semester: 5, icon: "☁️", abbr: "CLOUD" },
];

const NOTE_TYPES = [
  { id: "notes", name: "Notes", icon: "📄" },
  { id: "cheat-sheet", name: "Cheat Sheet", icon: "📋" },
  { id: "important-questions", name: "Important Questions", icon: "❓" },
  { id: "previous-paper", name: "Previous Paper", icon: "📝" },
  { id: "formula-sheet", name: "Formula Sheet", icon: "🔢" },
  { id: "summary", name: "Summary", icon: "📑" },
];

const SAMPLE_NOTES = [
  {
    id: 1,
    title: "SQL Cheat Sheet",
    subject: "dbms",
    semester: 3,
    unit: 2,
    type: "cheat-sheet",
    author: "NotesQueen99",
    rating: 4.8,
    downloads: 342,
    description: "All SQL commands with examples. SELECT, JOIN, GROUP BY, subqueries — everything you need for the exam. No fluff, just facts.",
    tags: ["sql", "revision", "dbms", "queries"],
    content: `# SQL Cheat Sheet 📋

## SELECT Statement
\`\`\`sql
SELECT column1, column2 FROM table_name;
SELECT * FROM students;
SELECT DISTINCT department FROM students;
\`\`\`

## WHERE Clause
\`\`\`sql
SELECT * FROM students WHERE marks > 80;
SELECT * FROM students WHERE name LIKE 'A%';
SELECT * FROM students WHERE age BETWEEN 18 AND 25;
\`\`\`

## JOIN Types
\`\`\`sql
-- INNER JOIN
SELECT s.name, c.course_name
FROM students s
INNER JOIN courses c ON s.course_id = c.id;

-- LEFT JOIN
SELECT s.name, g.grade
FROM students s
LEFT JOIN grades g ON s.id = g.student_id;
\`\`\`

## Aggregate Functions
\`\`\`sql
SELECT COUNT(*) FROM students;
SELECT AVG(marks) FROM students;
SELECT MAX(marks), MIN(marks) FROM students;
SELECT department, COUNT(*) FROM students GROUP BY department;
\`\`\`

## Subqueries
\`\`\`sql
SELECT name FROM students
WHERE marks > (SELECT AVG(marks) FROM students);
\`\`\`

> 💡 Pro tip: Always practice these in MySQL Workbench before the exam!`,
    dateAdded: "2026-09-20",
    file: "/assets/notes/sql-cheat-sheet.pdf"
  },
  {
    id: 2,
    title: "Normalization Complete Guide",
    subject: "dbms",
    semester: 3,
    unit: 3,
    type: "notes",
    author: "DBMaster",
    rating: 4.5,
    downloads: 256,
    description: "1NF to BCNF explained with real-world examples. Includes functional dependencies and decomposition.",
    tags: ["normalization", "1nf", "2nf", "3nf", "bcnf", "dbms"],
    content: `# Normalization — Complete Guide 📚

## Why Normalize?
- Eliminate redundancy
- Prevent update anomalies
- Ensure data integrity

## First Normal Form (1NF)
- All columns contain atomic values
- No repeating groups

**Before 1NF:**
| Student | Courses |
|---------|---------|
| Alice | Math, CS, Stats |

**After 1NF:**
| Student | Course |
|---------|--------|
| Alice | Math |
| Alice | CS |
| Alice | Stats |

## Second Normal Form (2NF)
- Must be in 1NF
- No partial dependencies

## Third Normal Form (3NF)
- Must be in 2NF
- No transitive dependencies

## Boyce-Codd Normal Form (BCNF)
- Every determinant must be a candidate key

> Remember: "The key, the whole key, and nothing but the key — so help me Codd."`,
    dateAdded: "2026-09-18",
    file: "/assets/notes/normalization-guide.pdf"
  },
  {
    id: 3,
    title: "Python OOP Masterclass Notes",
    subject: "adv-python",
    semester: 3,
    unit: 1,
    type: "notes",
    author: "PyWizard",
    rating: 4.9,
    downloads: 412,
    description: "Classes, inheritance, polymorphism, encapsulation, magic methods — the whole OOP saga in Python.",
    tags: ["python", "oop", "classes", "inheritance"],
    content: `# Python OOP Masterclass 🐍

## Classes & Objects
\`\`\`python
class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks
    
    def grade(self):
        if self.marks >= 90:
            return "A+"
        elif self.marks >= 80:
            return "A"
        else:
            return "B"
\`\`\`

## Inheritance
\`\`\`python
class GradStudent(Student):
    def __init__(self, name, marks, thesis):
        super().__init__(name, marks)
        self.thesis = thesis
\`\`\`

## Magic Methods
\`\`\`python
def __str__(self):
    return f"{self.name} ({self.marks})"

def __len__(self):
    return len(self.courses)

def __eq__(self, other):
    return self.marks == other.marks
\`\`\`

## Encapsulation
- Public: \`self.name\`
- Protected: \`self._name\`
- Private: \`self.__name\`

> 🔥 OOP isn't hard — it's just organizing chaos into classes.`,
    dateAdded: "2026-09-22",
    file: "/assets/notes/python-oop.pdf"
  },
  {
    id: 4,
    title: "Linear Algebra Formula Sheet",
    subject: "math3",
    semester: 3,
    unit: 1,
    type: "formula-sheet",
    author: "MathNerd42",
    rating: 4.7,
    downloads: 289,
    description: "Matrices, eigenvalues, eigenvectors, determinants, vector spaces — all formulas on two pages.",
    tags: ["linear-algebra", "matrices", "eigenvalues", "formulas"],
    content: `# Linear Algebra Formula Sheet 📐

## Matrix Operations
- (AB)ᵀ = BᵀAᵀ
- (A⁻¹)ᵀ = (Aᵀ)⁻¹
- det(AB) = det(A) × det(B)

## Determinant (2×2)
| a  b |
| c  d | = ad - bc

## Determinant (3×3)
Use cofactor expansion along any row/column.

## Eigenvalues
Solve: det(A - λI) = 0

## Eigenvectors
For each λ, solve: (A - λI)x = 0

## Properties
- Sum of eigenvalues = trace(A)
- Product of eigenvalues = det(A)

## Rank
rank(A) = number of non-zero rows in RREF

> 📌 Eigenvalues show up in EVERY exam. Learn them or perish.`,
    dateAdded: "2026-09-15",
    file: "/assets/notes/linear-algebra.pdf"
  },
  {
    id: 5,
    title: "Probability Distributions Summary",
    subject: "stats",
    semester: 3,
    unit: 2,
    type: "summary",
    author: "StatsGuru",
    rating: 4.3,
    downloads: 198,
    description: "Binomial, Poisson, Normal, and more. When to use which distribution + formulas + examples.",
    tags: ["probability", "distributions", "binomial", "normal", "statistics"],
    content: `# Probability Distributions 📊

## Binomial Distribution
- n fixed trials, p probability of success
- P(X=k) = C(n,k) × pᵏ × (1-p)ⁿ⁻ᵏ
- Mean = np, Variance = np(1-p)

## Poisson Distribution
- Events in a fixed interval
- P(X=k) = (λᵏ × e⁻λ) / k!
- Mean = Variance = λ

## Normal Distribution
- Bell curve, symmetric
- Z = (X - μ) / σ
- 68-95-99.7 rule

## When to Use What?
| Scenario | Distribution |
|----------|-------------|
| Fixed trials, yes/no | Binomial |
| Rare events, fixed time | Poisson |
| Continuous, symmetric | Normal |

> 🎲 Statistics is just organized gambling with extra steps.`,
    dateAdded: "2026-09-17",
    file: "/assets/notes/prob-distributions.pdf"
  },
  {
    id: 6,
    title: "R Programming Basics",
    subject: "r-prog",
    semester: 3,
    unit: 1,
    type: "notes",
    author: "DataDiva",
    rating: 4.1,
    downloads: 167,
    description: "Vectors, data frames, functions, ggplot2 basics. Everything to survive the R lab exam.",
    tags: ["r", "programming", "ggplot", "data-frames"],
    content: `# R Programming Basics 📈

## Vectors
\`\`\`r
x <- c(1, 2, 3, 4, 5)
names(x) <- c("a", "b", "c", "d", "e")
mean(x)  # 3
\`\`\`

## Data Frames
\`\`\`r
df <- data.frame(
  name = c("Alice", "Bob"),
  marks = c(85, 92)
)
df$name  # Access column
\`\`\`

## ggplot2
\`\`\`r
library(ggplot2)
ggplot(df, aes(x=name, y=marks)) +
  geom_bar(stat="identity") +
  theme_minimal()
\`\`\`

> 🤓 R is like Excel if Excel went to grad school.`,
    dateAdded: "2026-09-19",
    file: "/assets/notes/r-basics.pdf"
  },
  {
    id: 7,
    title: "ER Diagrams — Previous Year Paper",
    subject: "dbms",
    semester: 3,
    unit: 1,
    type: "previous-paper",
    author: "ExamHacker",
    rating: 4.6,
    downloads: 378,
    description: "Solved previous year paper on ER diagrams and relational models. Includes all diagram questions.",
    tags: ["er-diagram", "exam", "previous-paper", "dbms"],
    content: `# ER Diagrams — Previous Year Paper 📝

## Q1. Design an ER diagram for a Library Management System.
**Entities:** Book, Member, Loan
**Relationships:** Borrows (M:N), Has (1:N)

## Q2. Convert the following ER diagram to relational schema.
- Strong entity → Table
- Weak entity → Table with foreign key
- M:N relationship → Junction table

## Q3. Explain cardinality ratios with examples.
- 1:1 — Person ↔ Passport
- 1:N — Department ↔ Employee
- M:N — Student ↔ Course

## Q4. What are the differences between total and partial participation?
- Total: Every entity participates (double line)
- Partial: Some entities participate (single line)

> 🎯 This paper pattern repeats almost every year. You're welcome.`,
    dateAdded: "2026-09-12",
    file: "/assets/notes/er-diagrams-pyp.pdf"
  },
  {
    id: 8,
    title: "Process Scheduling Algorithms",
    subject: "os",
    semester: 4,
    unit: 2,
    type: "notes",
    author: "KernelKing",
    rating: 4.7,
    downloads: 301,
    description: "FCFS, SJF, Round Robin, Priority — all scheduling algorithms with Gantt charts and examples.",
    tags: ["scheduling", "os", "fcfs", "sjf", "round-robin"],
    content: `# Process Scheduling Algorithms 💻

## First Come First Served (FCFS)
- Non-preemptive
- Simple but can cause convoy effect
- Average WT can be high

## Shortest Job First (SJF)
- Optimal average waiting time
- Can be preemptive (SRTF) or non-preemptive
- Starvation possible for long processes

## Round Robin (RR)
- Time quantum based
- Fair distribution
- Good for time-sharing systems
- Higher context switching overhead

## Priority Scheduling
- Each process gets a priority
- Can be preemptive or non-preemptive
- Aging prevents starvation

## Comparison Table
| Algorithm | Preemptive | Starvation | Overhead |
|-----------|-----------|------------|----------|
| FCFS | No | No | Low |
| SJF | Both | Yes | Medium |
| RR | Yes | No | High |
| Priority | Both | Yes | Medium |

> ⚡ Round Robin is the democratic choice of scheduling.`,
    dateAdded: "2026-09-21",
    file: "/assets/notes/scheduling.pdf"
  },
  {
    id: 9,
    title: "Sorting Algorithms Visualized",
    subject: "dsa",
    semester: 4,
    unit: 3,
    type: "cheat-sheet",
    author: "AlgoAce",
    rating: 4.9,
    downloads: 445,
    description: "Bubble, Selection, Insertion, Merge, Quick sort — time complexity, space complexity, and step-by-step traces.",
    tags: ["sorting", "algorithms", "complexity", "dsa"],
    content: `# Sorting Algorithms Cheat Sheet 🌳

## Time Complexities
| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) |
| Selection | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion | O(n) | O(n²) | O(n²) | O(1) |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) |

## Quick Sort Partition
\`\`\`
Choose pivot → partition around it → recurse
\`\`\`

## Merge Sort Strategy
\`\`\`
Divide → Sort halves → Merge sorted halves
\`\`\`

## When to Use What?
- Nearly sorted? → Insertion Sort
- Memory limited? → Quick Sort
- Guaranteed O(n log n)? → Merge Sort
- Teaching purposes? → Bubble Sort 😅

> 🏆 If you only learn one: learn Quick Sort.`,
    dateAdded: "2026-09-23",
    file: "/assets/notes/sorting.pdf"
  },
  {
    id: 10,
    title: "HTML/CSS/JS Quick Reference",
    subject: "web-dev",
    semester: 4,
    unit: 1,
    type: "cheat-sheet",
    author: "WebWitch",
    rating: 4.4,
    downloads: 276,
    description: "Essential HTML tags, CSS properties, and JS concepts. Perfect for lab exams and quick revision.",
    tags: ["html", "css", "javascript", "web", "reference"],
    content: `# Web Dev Quick Reference 🌐

## HTML Essentials
\`\`\`html
<header>, <nav>, <main>, <section>, <footer>
<form>, <input>, <select>, <textarea>, <button>
<table>, <thead>, <tbody>, <tr>, <th>, <td>
\`\`\`

## CSS Layout
\`\`\`css
/* Flexbox */
display: flex;
justify-content: center;
align-items: center;

/* Grid */
display: grid;
grid-template-columns: 1fr 1fr 1fr;
gap: 1rem;
\`\`\`

## JavaScript Basics
\`\`\`javascript
// Arrow functions
const add = (a, b) => a + b;

// Array methods
arr.map(x => x * 2);
arr.filter(x => x > 5);
arr.reduce((sum, x) => sum + x, 0);

// DOM
document.querySelector('.class');
element.addEventListener('click', fn);
\`\`\`

> 🌐 The internet runs on these three languages and caffeine.`,
    dateAdded: "2026-09-14",
    file: "/assets/notes/html-css-js.pdf"
  },
  {
    id: 11,
    title: "ML Basics — Regression & Classification",
    subject: "ml-basics",
    semester: 4,
    unit: 1,
    type: "notes",
    author: "AIApprentice",
    rating: 4.6,
    downloads: 234,
    description: "Linear regression, logistic regression, decision trees — concepts, math, and Python code.",
    tags: ["machine-learning", "regression", "classification", "ml"],
    content: `# ML Basics — Regression & Classification 🤖

## Linear Regression
- Predicts continuous values
- y = mx + b
- Loss: MSE = (1/n) Σ(yᵢ - ŷᵢ)²
- Gradient Descent to minimize loss

## Logistic Regression
- Binary classification
- Sigmoid function: σ(z) = 1 / (1 + e⁻ᶻ)
- Output: probability between 0 and 1

## Decision Trees
- Split on features that maximize information gain
- Entropy: H = -Σ pᵢ log₂(pᵢ)
- Gini: G = 1 - Σ pᵢ²

## Evaluation Metrics
| Metric | Use Case |
|--------|----------|
| Accuracy | Balanced classes |
| Precision | Cost of FP is high |
| Recall | Cost of FN is high |
| F1 Score | Imbalanced classes |

> 🧠 ML is just curve fitting with extra confidence.`,
    dateAdded: "2026-09-16",
    file: "/assets/notes/ml-basics.pdf"
  },
  {
    id: 12,
    title: "OSI Model — 7 Layers Explained",
    subject: "cn",
    semester: 5,
    unit: 1,
    type: "notes",
    author: "NetNinja",
    rating: 4.8,
    downloads: 367,
    description: "All 7 layers of the OSI model with protocols, PDUs, devices, and mnemonics to remember them.",
    tags: ["osi", "networking", "layers", "protocols"],
    content: `# OSI Model — 7 Layers 🔗

## The Layers (Bottom → Top)
| # | Layer | PDU | Example |
|---|-------|-----|---------|
| 1 | Physical | Bits | Cables, Hubs |
| 2 | Data Link | Frames | Switches, MAC |
| 3 | Network | Packets | Routers, IP |
| 4 | Transport | Segments | TCP, UDP |
| 5 | Session | Data | NetBIOS |
| 6 | Presentation | Data | SSL, JPEG |
| 7 | Application | Data | HTTP, FTP |

## Mnemonic
**P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way

## TCP vs UDP
| TCP | UDP |
|-----|-----|
| Reliable | Fast |
| Connection-oriented | Connectionless |
| Ordered delivery | No guarantee |
| HTTP, FTP, SMTP | DNS, VoIP, Gaming |

> 🌍 The internet is just 7 layers of organized chaos.`,
    dateAdded: "2026-09-24",
    file: "/assets/notes/osi-model.pdf"
  },
  {
    id: 13,
    title: "SDLC Models Comparison",
    subject: "se",
    semester: 5,
    unit: 1,
    type: "summary",
    author: "DevDude",
    rating: 4.2,
    downloads: 189,
    description: "Waterfall, Agile, Spiral, V-Model, RAD — when to use which and their pros/cons.",
    tags: ["sdlc", "agile", "waterfall", "software-engineering"],
    content: `# SDLC Models Comparison ⚙️

## Waterfall
- Sequential phases
- Good for well-defined requirements
- No going back easily

## Agile
- Iterative sprints
- Flexible requirements
- Customer collaboration
- Scrum, Kanban

## Spiral
- Risk-driven
- Combines waterfall + prototyping
- Good for large, complex projects

## V-Model
- Verification & Validation
- Testing parallel to development
- Strict and disciplined

## Comparison
| Model | Flexibility | Risk Handling | Speed |
|-------|------------|---------------|-------|
| Waterfall | Low | Low | Medium |
| Agile | High | Medium | Fast |
| Spiral | Medium | High | Slow |
| V-Model | Low | Medium | Medium |

> 🔄 Agile is what everyone claims to do but nobody actually does correctly.`,
    dateAdded: "2026-09-11",
    file: "/assets/notes/sdlc-models.pdf"
  },
  {
    id: 14,
    title: "Cloud Computing Important Questions",
    subject: "cloud",
    semester: 5,
    unit: 2,
    type: "important-questions",
    author: "CloudChaser",
    rating: 4.4,
    downloads: 213,
    description: "Top 25 questions expected in the cloud computing exam. Covers IaaS, PaaS, SaaS, virtualization.",
    tags: ["cloud", "iaas", "paas", "saas", "exam"],
    content: `# Cloud Computing — Important Questions ☁️

## Short Answer
1. Define cloud computing and its characteristics.
2. Differentiate between IaaS, PaaS, and SaaS.
3. Explain virtualization and its types.
4. What is a hypervisor? Types?
5. Explain the concept of multi-tenancy.

## Long Answer
6. Compare public, private, and hybrid clouds.
7. Explain the architecture of AWS/Azure/GCP.
8. Discuss cloud security challenges.
9. Explain load balancing and auto-scaling.
10. What is serverless computing? Pros and cons.

## Diagram Questions
11. Draw the cloud computing architecture.
12. Illustrate the SaaS delivery model.

## Service Models
| Model | You Manage | Provider Manages |
|-------|-----------|-----------------|
| IaaS | OS, Apps | Hardware, Network |
| PaaS | Apps | OS, Runtime |
| SaaS | Nothing | Everything |

> ☁️ The cloud is just someone else's computer. But fancier.`,
    dateAdded: "2026-09-13",
    file: "/assets/notes/cloud-iq.pdf"
  },
  {
    id: 15,
    title: "Python Decorators & Generators",
    subject: "adv-python",
    semester: 3,
    unit: 3,
    type: "notes",
    author: "PyWizard",
    rating: 4.5,
    downloads: 198,
    description: "Deep dive into decorators, generators, and iterators. Includes practical examples and common patterns.",
    tags: ["python", "decorators", "generators", "advanced"],
    content: `# Decorators & Generators 🐍✨

## Decorators
\`\`\`python
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Took {time.time() - start:.2f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(2)
\`\`\`

## Generators
\`\`\`python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

for num in fibonacci(10):
    print(num)
\`\`\`

## Generator Expressions
\`\`\`python
squares = (x**2 for x in range(100))
# Memory efficient — computed on demand
\`\`\`

> 🎭 Decorators are just functions wearing other functions as hats.`,
    dateAdded: "2026-09-10",
    file: "/assets/notes/decorators-generators.pdf"
  },
  {
    id: 16,
    title: "Deadlock — Detection & Prevention",
    subject: "os",
    semester: 4,
    unit: 3,
    type: "notes",
    author: "KernelKing",
    rating: 4.3,
    downloads: 221,
    description: "Deadlock conditions, Banker's algorithm, resource allocation graphs. Complete exam prep.",
    tags: ["deadlock", "os", "bankers-algorithm", "prevention"],
    content: `# Deadlock — Detection & Prevention 💻🔒

## Four Necessary Conditions
1. **Mutual Exclusion** — Resources not shareable
2. **Hold & Wait** — Holding one, waiting for another
3. **No Preemption** — Can't forcibly take resources
4. **Circular Wait** — Circular chain of waiting

## Prevention Strategies
- Break mutual exclusion → Make resources shareable
- Break hold & wait → Request all at once
- Allow preemption → Take resources if needed
- Break circular wait → Order resources numerically

## Banker's Algorithm
- Check if system is in safe state
- If granting request leaves safe state → deny
- Safe sequence exists → grant

## Resource Allocation Graph
- Process → Resource: request edge
- Resource → Process: assignment edge
- Cycle in graph → possible deadlock

> 🔒 A deadlock is when two processes say "you go first" forever.`,
    dateAdded: "2026-09-08",
    file: "/assets/notes/deadlock.pdf"
  },
  {
    id: 17,
    title: "Binary Trees & Traversals",
    subject: "dsa",
    semester: 4,
    unit: 2,
    type: "notes",
    author: "AlgoAce",
    rating: 4.7,
    downloads: 312,
    description: "Inorder, preorder, postorder, level-order traversals + BST operations. With code and diagrams.",
    tags: ["binary-tree", "traversal", "bst", "dsa"],
    content: `# Binary Trees & Traversals 🌳

## Traversal Orders
- **Inorder** (Left, Root, Right) → Sorted order for BST
- **Preorder** (Root, Left, Right) → Copy tree
- **Postorder** (Left, Right, Root) → Delete tree
- **Level Order** → BFS using queue

## BST Operations
\`\`\`python
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def insert(root, val):
    if not root:
        return Node(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root
\`\`\`

## Properties
- Max nodes at level l = 2ˡ
- Max nodes in tree of height h = 2ʰ⁺¹ - 1
- Min height = ⌊log₂(n)⌋

> 🌳 A binary tree walks into a bar. The bartender says: "I see you brought your children."`,
    dateAdded: "2026-09-06",
    file: "/assets/notes/binary-trees.pdf"
  },
  {
    id: 18,
    title: "Flexbox & Grid Layout Guide",
    subject: "web-dev",
    semester: 4,
    unit: 2,
    type: "cheat-sheet",
    author: "WebWitch",
    rating: 4.6,
    downloads: 287,
    description: "Visual guide to CSS Flexbox and Grid. All properties with examples and common layout patterns.",
    tags: ["css", "flexbox", "grid", "layout", "web"],
    content: `# Flexbox & Grid Layout Guide 🌐📐

## Flexbox Container
\`\`\`css
.container {
  display: flex;
  flex-direction: row | column;
  justify-content: center | space-between;
  align-items: center | stretch;
  flex-wrap: wrap;
  gap: 1rem;
}
\`\`\`

## Flexbox Items
\`\`\`css
.item {
  flex: 1;           /* grow equally */
  flex-shrink: 0;    /* don't shrink */
  align-self: end;   /* override alignment */
  order: -1;         /* reorder */
}
\`\`\`

## Grid Container
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
}
\`\`\`

## Common Patterns
- **Holy Grail:** header, sidebar, main, sidebar, footer
- **Card Grid:** repeat(auto-fill, minmax(250px, 1fr))
- **Centering:** place-items: center (grid)

> 🎨 Flexbox = 1D layout. Grid = 2D layout. Together = unstoppable.`,
    dateAdded: "2026-09-05",
    file: "/assets/notes/flexbox-grid.pdf"
  },
  {
    id: 19,
    title: "Subnetting Made Simple",
    subject: "cn",
    semester: 5,
    unit: 2,
    type: "cheat-sheet",
    author: "NetNinja",
    rating: 4.5,
    downloads: 254,
    description: "IP addressing, subnetting, CIDR notation — solved examples and shortcut methods.",
    tags: ["subnetting", "ip", "cidr", "networking"],
    content: `# Subnetting Made Simple 🔗🧮

## IP Address Classes
| Class | Range | Default Mask |
|-------|-------|-------------|
| A | 1-126 | 255.0.0.0 (/8) |
| B | 128-191 | 255.255.0.0 (/16) |
| C | 192-223 | 255.255.255.0 (/24) |

## Subnetting Formula
- Subnets = 2ˢ (s = borrowed bits)
- Hosts per subnet = 2ʰ - 2 (h = host bits)

## Example: 192.168.1.0/26
- Subnet mask: 255.255.255.192
- Subnets: 4
- Hosts per subnet: 62
- Ranges:
  - 192.168.1.0 - 192.168.1.63
  - 192.168.1.64 - 192.168.1.127
  - 192.168.1.128 - 192.168.1.191
  - 192.168.1.192 - 192.168.1.255

## CIDR Notation
/24 = 256 addresses
/25 = 128 addresses
/26 = 64 addresses
/27 = 32 addresses
/28 = 16 addresses

> 🧮 Subnetting is just binary math pretending to be networking.`,
    dateAdded: "2026-09-07",
    file: "/assets/notes/subnetting.pdf"
  },
  {
    id: 20,
    title: "Hypothesis Testing Cheat Sheet",
    subject: "stats",
    semester: 3,
    unit: 4,
    type: "cheat-sheet",
    author: "StatsGuru",
    rating: 4.4,
    downloads: 176,
    description: "Z-test, t-test, chi-square, ANOVA — when to use which, formulas, and decision rules.",
    tags: ["hypothesis", "testing", "z-test", "t-test", "statistics"],
    content: `# Hypothesis Testing Cheat Sheet 📊🧪

## Steps
1. State H₀ and H₁
2. Choose significance level (α)
3. Calculate test statistic
4. Find p-value or critical value
5. Make decision

## Which Test?
| Scenario | Test |
|----------|------|
| One sample mean, σ known | Z-test |
| One sample mean, σ unknown | t-test |
| Two sample means | Independent t-test |
| Before/after | Paired t-test |
| Categorical data | Chi-square |
| 3+ group means | ANOVA |

## Decision Rule
- p-value < α → Reject H₀
- p-value ≥ α → Fail to reject H₀

## Type I vs Type II Errors
- Type I (α): Reject true H₀ (false positive)
- Type II (β): Fail to reject false H₀ (false negative)

> 🧪 We don't "accept" H₀. We just fail to reject it. Science is passive-aggressive.`,
    dateAdded: "2026-09-09",
    file: "/assets/notes/hypothesis-testing.pdf"
  },
];

// Boot messages
const BOOT_MESSAGES = [
  "Initializing NOTES.EXE...",
  "Loading student resources...",
  "Indexing notes database...",
  "Loading caffeine dependencies...",
  "Compiling questionable sleep schedule...",
  "Scanning for missing assignments...",
  "Buffering motivation...",
  "Loading last-minute revision protocols...",
  "Checking deadline proximity...",
  "SYSTEM READY ✓"
];

// System status data
const SYSTEM_STATUS = {
  notesIndexed: 1284,
  subjects: 18,
  studentsOnline: 42,
  coffeeConsumed: "∞",
  uptimeHours: 8760,
  lastCrash: "Y2K bug (fixed)"
};

// Default user profile
const DEFAULT_PROFILE = {
  name: "Student",
  username: "user.exe",
  course: "BSc Data Science",
  semester: 3,
  avatar: "assets/icons/profile.png",
  notesUploaded: 0,
  joinDate: "2026-09-01"
};

// Playful messages for various states
const MESSAGES = {
  welcome: [
    "Your notes are waiting. Your deadline is probably not. ⏰",
    "Academic weapon mode: ACTIVATED 🎯",
    "Time to pretend we're productive 💅",
    "Your GPA called. It wants attention. 📞",
    "Another day, another set of notes to ignore 📚"
  ],
  empty: {
    saved: "Your future study sessions will thank you. 📖",
    search: "We searched every suspicious folder. Nothing. 🔍",
    uploads: "Be the first one to add something useful! 📤",
    notes: "This folder is emptier than your motivation. 📂"
  },
  notifications: {
    save: "was added to your saved notes! 💾",
    unsave: "was removed from saved notes. Bye bye! 👋",
    upload: "Your note is now in the system! 📤",
    welcome: "Welcome back to Notes.exe! 🖥️",
    deadline: "You should probably start studying. ⚠️"
  }
};

// Export for use
window.NotesData = {
  SEMESTERS,
  SUBJECTS,
  NOTE_TYPES,
  SAMPLE_NOTES,
  BOOT_MESSAGES,
  SYSTEM_STATUS,
  DEFAULT_PROFILE,
  MESSAGES
};

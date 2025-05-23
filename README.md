# Fractal Monsters Evolution

[Original Article](https://habr.com/ru/articles/328568/) 

[Live demo](https://fractal.xcont.com/)

![demo](images/fractal_demo.gif)

## Overview
The **Fractal Monsters Evolution** project, based on a 2017 Habr article, develops a system to evolve geometric fractals using a genetic algorithm. Implemented in JavaScript with HTML5 for visualization, it generates self-similar patterns by optimizing fractal parameters (e.g., transformation coefficients or recursion rules) to achieve user-defined structural or visual properties. This work extends the exploration of emergent systems in the [Cellular Automata Evolution](https://github.com/xcontcom/cellular-automata-evolution) project, applying genetic algorithms to navigate the complex space of fractal configurations.

## Features
- **Genetic Algorithm Optimization**: Evolves fractal parameters using a genetic algorithm with crossover and mutation (configurable rates, e.g., 5–25%), targeting specific patterns or behaviors across a population of fractal rules.
- **Fractal Generation**: Produces geometric fractals via iterative methods (e.g., iterated function systems or L-systems), with adjustable parameters such as recursion depth or scaling factors.
- **Visualization**: Displays evolved fractals in a web browser using HTML5, supporting real-time inspection of patterns.
- **Flexible Fitness Functions**: Allows user-defined criteria to guide fractal evolution, such as matching target geometries or optimizing visual complexity.
- **Parameter Exploration**: Enables manual adjustment of fractal parameters to study diverse pattern outcomes.

## Project Structure
```
fractal-monsters-evolution/
├── docs/
│   └── article.md       # Summary of 2017 Habr article
├── index.html           # Browser interface for fractal visualization
├── fractals.js          # Logic for fractal generation and genetic algorithm
├── style.css            # Styling for the interface
├── screenshots/         # Sample fractal images
│   └── fractal_demo.png
└── README.md            # Project documentation
```

## Technical Details
- **Genetic Algorithm**: Implements selection, crossover, and mutation to evolve fractal parameters, optimizing for user-specified fitness criteria within a population of candidate fractals.
- **Fractal Algorithms**: Generates patterns using iterative methods (e.g., IFS, L-systems), with parameters encoded as genes for evolution.
- **Visualization**: Uses HTML5 for browser-based rendering of fractals, ensuring compatibility and efficient display.
- **Modularity**: Separates fractal generation and evolution logic (`fractals.js`) from the interface (`index.html`) for ease of modification.
- **Output**: Supports exporting fractal images for analysis or documentation.

## Significance
This project investigates the application of genetic algorithms to evolve geometric fractals, focusing on their structural properties and emergent patterns. By optimizing fractal parameters, it explores a vast configuration space, complementing the rule-based evolution in the [Cellular Automata Evolution](https://github.com/xcontcom/cellular-automata-evolution) project. Shared on GitHub, it provides a framework for researchers and enthusiasts to study computational geometry and evolutionary algorithms.

## License
MIT License. See [LICENSE](LICENSE) for details.

## Contact
Serhii Herasymov  
sergeygerasimofff@gmail.com  
https://github.com/xcontcom

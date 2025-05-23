# Fractal Monsters Evolution

[Original Article](https://habr.com/ru/articles/328568/) 

[Live demo](https://fractal.xcont.com/)

![Demo](screenshots/demo.gif)

## Overview
The **Fractal Monsters Evolution** project, based on a 2017 Habr article, develops a system to evolve geometric fractals using a genetic algorithm. Implemented in JavaScript with HTML5 for visualization, it generates self-similar patterns by optimizing fractal parameters (e.g., transformation coefficients or recursion rules) to achieve user-defined structural or visual properties. This work extends the exploration of emergent systems in the [Cellular Automata Evolution](https://github.com/xcontcom/cellular-automata-evolution) project, applying genetic algorithms to navigate the complex space of fractal configurations.

## Features
- **Genetic Algorithm Optimization**: Evolves fractal parameters using selection, crossover, and mutation (configurable rates, e.g., 5–25%) to target specific patterns or behaviors within a population of fractal rules.
- **Fractal Generation**: Produces geometric fractals via iterative methods (e.g., iterated function systems or L-systems), with adjustable parameters such as recursion depth or angles.
- **Interactive Visualization**: Renders fractals in a web browser using HTML5, with a Windows 98-style interface.
- **Manual Fractal Design**: Supports user-defined fractal construction via mouse input (`2d.html`, `2d.js`).
- **Local Storage**: Persists fractal parameters and evolutionary data in browser local storage for seamless experimentation.
- **3D Fractal Experiments**: Includes exploratory code (`geom3d/`) for generating three-dimensional fractal structures.
- **Dope as Hell!**: I mean, c'mon! Check out the live demo. All those buttons are win98 style, and all those fractals have parent trees. o_O

## Project Structure
```
fractal-monsters-evolution/
├── css/                 # Styling for the Windows 98-style interface
├── geom3d/              # Experimental code for 3D fractals
├── 2d.html              # Interface for building fractals with mouse input
├── 2d.js                # Logic for mouse-based fractal construction
├── draw.js              # Fractal drawing and rendering functions
├── index.html           # Main interface for fractal visualization and evolution
├── init.js              # Genetic algorithm and fractal generation logic
├── screenshots/         # Sample fractal images or GIFs
│   └── demo.gif
└── README.md            # Project documentation
```

## Technical Details
- **Genetic Algorithm**: Implements selection, crossover, and mutation to evolve fractal parameters, encoded as genes, optimizing for user-specified fitness criteria.
- **Fractal Algorithms**: Generates patterns using iterative methods (e.g., IFS, L-systems), with parameters adjustable via genetic evolution or manual input.
- **Visualization**: Uses HTML5 canvas for browser-based rendering, with a Windows 98-style UI for intuitive interaction.
- **Modularity**: Separates fractal generation (`init.js`), rendering (`draw.js`), and manual design (`2d.js`) from interfaces (`index.html`, `2d.html`).
- **Local Storage**: Stores fractal parameters and evolutionary data in browser local storage for persistence.
- **3D Experiments**: Includes preliminary code in `geom3d/` for extending fractals to three-dimensional spaces.
- **Output**: Supports exporting fractal images for analysis or documentation.

## Significance
This project investigates the application of genetic algorithms to evolve geometric fractals, focusing on their structural properties and emergent patterns. By optimizing fractal parameters, it explores a vast configuration space, complementing the rule-based evolution in the [Cellular Automata Evolution](https://github.com/xcontcom/cellular-automata-evolution) project. Shared on GitHub, it provides a framework for researchers and enthusiasts to study computational geometry and evolutionary algorithms.

## License
MIT License. See [LICENSE](LICENSE) for details.

## Contact
Serhii Herasymov  
sergeygerasimofff@gmail.com  
https://github.com/xcontcom

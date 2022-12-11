<h3 align="center">API Mapper</h3>

  <p align="center">
    Maps API result to desired fields
    <br />
  </p>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This module aims to map external API calls fields to clients desired fields.

Client should provide YAML file path . It will parse that file and convert the provided result keys to desired fields.


<!-- GETTING STARTED -->
## Getting Started

for future developments this modules uses factory method so that its made easy to add another converter.
Since in the requirements the supported format was XML nad JSON we only have 2 converter.
XML can be converted to JSON so I decided to use decorator pattern.XMLConverter wraps around JSONConverter.

<!-- ROADMAP -->
## Roadmap

- [x] Add JSONConverter
- [x] Add XMLConverter
- [x] Add documentation
- [ ] Customized Error handling
- [ ] Add transform feature


<!-- CONTACT -->
## Contact

Mohadese Bagheri - (https://www.linkedin.com/in/mohadesebagheri/) - mohadesehbaqeri@gmail.com

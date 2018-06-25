## GitHub
[Link](https://github.com/ronasher/bb-cucumber-js.git)

## Run subdirectories
[Example directory structure](https://makandracards.com/makandra/4971-how-to-organize-and-execute-cucumber-features-e-g-in-subdirectories)

# Windows package.json, for scripts:  npm run test-dev
```
"test-dev": "node ./node_modules/cucumber/bin/cucumber-js --world-parameters=\"{\"\"config\"\": \"\"e2e\"\"}\"",
```

# Testing Strategies
[Exmaple testing strategies](http://www.seleniumeasy.com/selenium-tutorials/selenium-locators)

## VS Code configuration to debug
```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/node_modules/cucumber/bin/cucumber-js"
        }
    ]
}
```
# youtrack-workflow-cli

[![We recommend IntelliJ IDEA](http://www.elegantobjects.org/intellij-idea.svg)](https://www.jetbrains.com/idea/)

[![License](https://img.shields.io/badge/license-Apache%202-blue.svg)](https://github.com/newmediatech/youtrack-workflow-cli/blob/master/LICENSE)

## Why?

We like [Youtrack](https://www.jetbrains.com/youtrack/?fromMenu), 
but [youtrack-scripting](https://github.com/JetBrains/youtrack-scripting) can't upload/download all workflows in one command.

## Usage

```
Usage: youtrack-workflow-cli [options] [command]

Options:
  -V, --version                  output the version number
  -H, --host <host>              The base URL of your YouTrack installation
  -T, --token <token>            A permanent token that grants access to the YouTrack service. You can generate your own permanent tokens to authenticate with YouTrack on the Authentication tab of your Hub profile.
  -h, --help                     output usage information

Commands:
  list                           View a list of installed workflows
  download [options] [workflow]  Download a workflow. If workflow not set download all workflows.
  upload [options] [workflow]    Upload workflow to server. If workflow not set upload all workflows.
```


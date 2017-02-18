# md-es6-formatter README

This is basic VSCODE estension to fix a limitation of HookyQR.beautify-0.7.3  has when formats a file ES6 or Typescript 
which contains an instruction "import.....from...;"  

Basically my extension calls HookyQR.beautify-0.7.3 or Lonefy (changeable by configuration)
When the **beautifier** chosen finishes the job I run mine which convert something like 
 
 import { 
Some1, 
Some2,
} from Something ;

into 

import { Some1, Some2 } from Something;

for now is  important to finish the instruction with semicolon **;**
 

 
## Requirements
HookyQR.beautify-0.7.3 is required since the first the extension does  is to trigger the beuatifier of HookyQR

## Extension Settings
The extension uses thi property to recognise which command beautifier need to be triggered. 
"beautify.commandName": {
    "type": "string",
    "default": "HookyQR.beautifyFile"
}

## Known Issues
Is still in beta, be carefull using it

## Release Notes

Right now the test has made just with HookyQR.beautifyFile

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------
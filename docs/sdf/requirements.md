***5.1 Software Requirements Document***

**5.2 Functional Requirements**

*5.2.1 Graphical User Interface (GUI)*

5.2.1.1 The GUI shall provide a set of menus to access the functions of the applications on the project level. These will include but aren't limited to:
* New file
* Open file
* Delete file
* Save file
* Debug file
* Rename file
* New project
* Open project
* Close project
* Export project
* Undo
* Redo
* Exit


5.2.1.2 The GUI shall provide the user a window (Canvas) to visually create Javascript code.
* The Canvas will allow the user to draw nodes translating to javascript expressions and statements.
* The Canvas will allow the user to connect nodes to show the flow of the program and variables.
* The Canvas will visually inform the user of what values flow where.
* The Canvas will provide the user with a method to zoom and pan through the canvas.

5.2.1.3 The GUI shall provide the user with a button to create new variables, classes, and interfaces.

5.2.1.4 The GUI shall allow the user to see the output of their program as though running it on the command line.

*5.2.2 Translator*

5.2.2.1 The Translator shall allow the user to create one or more javascript files via exporting the project

5.2.2.2 The Translator shall produce accurate code to what the user programmed.

5.2.2.3 The Translator shall alert the user if an error exists in their code.


**5.3 Performance Requirements**

*5.2.3 Run-Time / Feedback*

5.2.3.1 The software shall load a file within 3 seconds of selection.

5.2.3.2 The software shall save a project within 8 seconds of button press.

5.2.3.3 The software shall provide feedback that it is working on any compilation until compilation is finished.

5.2.3.4 The software shall have less than 0.1 second wait to draw or connect a node or pin.

5.2.3.5 The software shall build .js files within 8 seconds of button press.


**5.4 Environment Requirements**

System Requirements:

| Category   | Requirement          |
|------------|----------------------|
| Processor  | Not Applicable       |
| Hard Drive | Not Applicable       |
| RAM        | Not Applicable       |
| Display    | 800 x 600 256 colors |
| Sound Card | Not Applicable       |


Software Requirements:

| Category         | Requirement                                                                    |
|------------------|--------------------------------------------------------------------------------|
| Operating System | Windows 7 or later, OS X Mavericks 10.9 or later, 64 bit Ubuntu 14.04 or later |
| Software         | Node v6 or later                                                               |

# 8.0 Software Test Plan

## 8.1 Introduction

This document outlines the testing procedure for the project. The plan will describe testing methods used to ensure the quality of the code.

## 8.2 Unit Test Plan

### 8.2.1 Unit Test Process

To conduct unit tests I am using the library mocha. This will run all my js files in the directory tests. These files use mocha to structure unit tests that import the code.

### 8.2.2 Unit Test Procedure

On the terminal navigate to the root folder of the project and enter the command ```npm test```.

## 8.3 Integration Test Plan

Testing integration of modules is incorporated under the same procedure as the unit tests.

## 8.4 Acceptance Test Plan

Acceptance Test will be done via using the application.

### 8.4.1 Acceptance Test Process

The acceptance test is done via sitting with the client (me), and using every aspect of the application. If the application is usable in every aspect then it is a pass.

### 8.4.2 Acceptance Test Procedure

1. Open the application
2. Load a Project
3. Pan the viewport
4. Zoom the viewport
5. Drag a Node
6. Add Nodes
7. Connect Pins of the created nodes
8. Create a Function
9. Use the function in main code
10. Create a class
11. Use the class
12. Create a new file
13. Import code from another file
14. Save File(s)
15. Compile code
16. Run generated javascript and ensure it works as intended
17. Exit Project
18. Reload project to ensure save works.

## 8.5 Test Configuration Control

All tests are to be located in the **tests** directory found in the root of the project. From there, the location of a test of a file should mirror the location of the tested file in the **src** directory. Test files made to test the integration of two parts will be placed into the **integration** folder located inside **tests**, and named file1-file2-...-fileN.js.  Before pushing any changes to any branch of the repository, the ```npm test``` command must be run without any errors. This inculdes the linting of the code.

## 8.6 Items Not Tested

The only component not tested is the visual representation o the data. However, this is confirmed via the acceptance test. Additionally, we do test to see that elements are added to the DOM, however, their appearance, styling, and user interaction is not tested in an automated fashion. This is because I do not want to learn a library for efficiently testing user interfaces.

## 8.7 Test Verification Matrix

Not yet completed as not all tests are done.

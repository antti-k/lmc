# LMC
## Intro
Little man computer (LMC) is a simple model of a computer that is generally used for learning purposes. When I first read about LMC I tought that programming my own simulator would be a great learning opportunity. Simulator is mostly based on [Wikipedia entry of LMC](https://en.wikipedia.org/wiki/Little_man_computer).  My simulator also has a functional assembler that supports mneumonics and labels for ease of programming. 

## Memory
Memory consists of 100 slots of 3 digit decimal numbers. The same memory is used for both instructions and program memory.

## Instructions
Instructions consist of 3 digit decimal numbers where first digit generally stands for instruction to execute and last two digits stand for memory address that are used with instruction. 

### List of instructions

Machine code | Assembler | Explanation
-|-|-
1XX | ADD | Adds the value in given memory index to the accumulator. Resets negative flag to false.
2XX | SUB | Subtracts the value in given memory index from the accumulator. If the new accumulator value would be less than zero sets negative flag to true and sets accumulator value to zero.
3XX | STA | Replaces current accumulator value with a value from given memory index.
5XX | LDA | Replaces current value in given memory index with the value in the accumulator.
6XX | BRA | Replaces current value in the program counter with given address (XX).
7XX | BRZ | If the accumulator value is zero, replaces current value in the program counter with given address (XX).
8XX | BRP | If the accumulator value is positive (negative flag is false), replaces current value in the program counter with given address (XX).
901 | INP | Replaces the accumulator value with the next value in the inbox and removes that value from the inbox.
902 | OUT | Copies the value from the accumulator to the outbox.
000 | HLT | Stops the program from running.
None | DAT | Stores a value to the next available memory slot. Not an instruction but only used in assembler with labels.


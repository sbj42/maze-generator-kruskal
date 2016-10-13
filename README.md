# maze-generator-kruskal
A maze generator using a randomized Kruskal's algorithm

This is a plugin for the `sbj42/maze-generator` package.

Kruskal's algorithm is a method of generating a "minimum spanning tree"
of an arbitrary graph.  This adapts naturally to generating mazes,
since every perfect maze is also a spanning tree.  For each wall, in
random order, we turn the wall into a passage if doing so does not
generate a loop.  That's it.  

```
___________________________________________________
|__ __|__ | | ___ | _______ __| | __________| | __|
| _ | ______| |__ _ | _ _ | ___ ____| __| _ ___ _ |
| |___|____ ___ |_|_|_| | | _ | ___ |_____|_|___| |
| | | ___ | | |____ ____| |_| |_| __|__ __| | ___ |
| _ __|__ |_| _ | | __|__ | |_| |_| |__ | ___ | | |
| |_|__ | |___|__ | _ __|__ | |__ | ___ _ | | | | |
|_| _ |____ ___ _ __| _ | |___| _ |__ | |_|____ | |
| __| | | __|___| |___| | ___ __|_| |_| |__ _ _ |_|
|__ |__ | ___ __| |__ __| __|_| _ ______|___| | | |
| ___ |__ _ |_| |_| | | ____|___|_| |__ | __| | | |
| | | | | |__ | _ |__ ___ ___ ___ ___ _ | ___ | __|
|___|_| __|__ | |_| ____| | __| _ | | | |_| __|___|
|__ _____ __|__ |__ _ | |_|_|___| __|_|____ ___ | |
| |_| _____ | |___| |_|__ __|__ _ |__ __| _ |__ __|
|_________|_______|_|___________|_______|_|_|_____|
```

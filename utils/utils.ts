import { pathType } from "../types";

const generateLabyrinth = () => {
  return [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
};

const getErrorMessage = (error: unknown) => {
  let message = "Unknown Error";
  if (error instanceof Error) {
    message = error.message;
  }
  return message;
};

const resolveLabyrinth = (
  labyrinth: number[][],
  start: [number, number],
  end: [number, number]
) => {
  var queue = [];
  labyrinth[start[0]][start[1]] = 1;
  queue.push([start]);

  while (queue.length > 0) {
    let path: pathType = queue.shift()!;
    let pos: pathType = path[path.length - 1];
    let direction: pathType = [
      [pos[0] + 1, pos[1]],
      [pos[0], pos[1] + 1],
      [pos[0] - 1, pos[1]],
      [pos[0], pos[1] - 1],
    ];

    // check all the possible direction
    for (var i = 0; i < direction.length; i++) {
      if (direction[i][0] == end[0] && direction[i][1] == end[1]) {
        // return the path that led to the end point
        return path.concat([end]);
      }

      if (
        direction[i][0] < 0 ||
        direction[i][0] >= labyrinth.length ||
        direction[i][1] < 0 ||
        direction[i][1] >= labyrinth[0].length ||
        labyrinth[direction[i][0]][direction[i][1]] != 0
      ) {
        continue;
      }

      labyrinth[direction[i][0]][direction[i][1]] = 1;
      // extend and push the path on the queue
      queue.push(path.concat([direction[i]]));
    }
  }
};

module.exports = { generateLabyrinth, getErrorMessage, resolveLabyrinth };

enum Directions {
    North = 'N',
    East = 'E',
    West = 'W',
    South = 'S',
}

enum Commands {
    Move = 'M',
    Left = 'L',
    Right = 'R',
}

class MarsRover {
    xCoord: number;
    yCoord: number;
    direction: Directions;

    constructor(initX: number, initY: number, initDirection: Directions) {
        // eventually replace the default values to actual parsed input
        this.xCoord = initX;
        this.yCoord = initY;
        this.direction = initDirection;
    }

    execute(commands: string): void {
        // TODO: validate the input later
        commands.split('').forEach((command: string) => {
            switch(command){
                case Commands.Move:
                    this.move();
                    break;
                case Commands.Left:
                    this.turnLeft();
                    break;
                case Commands.Left:
                    this.turnRight();
                    break;
                default:
                    // throw or error handling here.
                    break
            }
        });
    }

    turnRight(): void {
        // depending on current direction of the rover, rotate right
        switch(this.direction){
            case Directions.North:
                this.direction = Directions.East;
                break;
            case Directions.East:
                this.direction = Directions.South;
                break;
            case Directions.South:
                this.direction = Directions.West;
                break;
            case Directions.West:
                 this.direction = Directions.North;
                break;
        }
    }

    turnLeft(): void {
        // depending on current direction of the rover, rotate left
        switch(this.direction){
            case Directions.North:
                this.direction = Directions.West;
                break;
            case Directions.East:
                this.direction = Directions.North;
                break;
            case Directions.South:
                this.direction = Directions.East;
                break;
            case Directions.West:
                 this.direction = Directions.South;
                break;
        }
    }

    move(): void {
        // depending on current direction of the rover, move forward one
        // TODO: consider bounds of the map later on.
        switch(this.direction){
            case Directions.North:
                this.yCoord++;
                break;
            case Directions.East:
                this.xCoord++;
                break;
            case Directions.South:
                this.yCoord--;
                break;
            case Directions.West:
                this.xCoord--;
                break;
        }
    }
}

test("turn right should rotate the Rover 90 degrees to the right", () => {
    const rover = new MarsRover(0, 0, Directions.East);

    const expectPosition = 'S';
    rover.turnRight();
    expect(rover.direction).toBe(expectPosition);
})

test("move forward should alter the x and y coordinates of the rover accordingly", () => {
    const rover = new MarsRover(0, 0, Directions.North);

    const expectPosition = 1;
    rover.move();
    expect(rover.yCoord).toBe(expectPosition);
})

test("execute function calls the appropriate move for the rover", () => {
    const rover = new MarsRover(1, 2, Directions.North);
    const inputString = 'LMLMLMLMM';

    // expected 1 3 N
    const expectPositionX = 1;
    const expectPositionY = 3;
    const expectDirection = Directions.North;
    rover.execute(inputString);
    expect(rover.xCoord).toBe(expectPositionX);
    expect(rover.yCoord).toBe(expectPositionY);
    expect(rover.direction).toBe(expectDirection);
})
<<<<<<< HEAD
var thePlan =
  ["############################",
   "#      #    #      o      ##",
   "#                          #",
   "#          #####           #",
   "##         #   #    ##     #",
   "###           ##     #     #",
   "#           ###      #     #",
   "#   ####                   #",
   "#   ##       o             #",
   "# o  #         o       ### #",
   "#    #                     #",
   "############################"];

function Point(x,y){
  this.x = x;
  this.y = y;
}

Point.prototype.add = function(other) {
  return new Point(this.x + other.x, this.y + other.y);
}

var gridA = [["0,0", "1,0", "2,0"],
            ["0,1", "1,1", "2,1"]];

gridA[1][2];
//=> "2,1"

var gridB = ["0,0", "1,0", "2,0",
            "0,1", "1,1", "2,1"];

gridB[2 + 1 * 3];
//=> "2,1"

function Grid(width, height) {
  this.width = width;
  this.height = height;
  this.cells = new Array(width * height);
} 

Grid.prototype.valueAt = function(point) {
  return this.cells[point.y * this.width + point.x];
};

Grid.prototype.setValueAt = function(point, value) {
  this.cells[point.y * this.width + point.x] = value;
};

Grid.prototype.isInside = function(point) {
  return  point.x >= 0 && point.y >= 0 &&
          point.x < this.width && point.y < this.height;
};

Grid.prototype.moveValue = function(from, to) {
  this.setValueAt(to, this.valueAt(from));
  this.setValueAt(from, undefined);
}

Grid.prototype.each = function(action) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x <this.width; x++) {
      var point = new Point(x,y);
      action(point, this.valueAt(point));
    }
  }
};

function StupidBug() {};
StupidBug.prototype.act = function(surroundings) {
  return {type: "move", direction: "s"};
}

var wall = {};

function elementFromCharacter(character) {
  if (character == " ")
    return undefined;
  else if (character == "#")
    return wall;
  else if (character == "o")
    return new StupidBug();
}

function Terrrarium(plan) {
  var grid = new Grid(plan[o].length, plan.length);
  for (var y = 0; y < plan.length; y++) {
    var line = plan[y];
    for (var x = 0; x < line.length; x++) {
      grid.setValueAt(new Point(x,y), elementFromCharacter(line.charAt(x)));
    }
  } 
  this.grid = grid;
}

wall.character = "#";
StupidBug.prototype.character = "o";

function characterFromElement (element) {
  if (element == undefined)
    return " ";
  else
    return element.character;
}

Terrrarium.prototype.toString = function() {
  var characters = [];
  var endOfLine = this.grid.width - 1;

  this.grid.each(function (point, value) {
    characters.push(characterFromElement(value));
    if (point.x == endOfLine)
      characters.push("\n");
  });
  return characters.join("");
};

Terrrarium.prototype.listActingCharacters = function() {
  var found = [];
  this.grid.each(function(point, value) {
    if (value != undefined && value.act)
      found.push({object: value, point: point});
  });
  return found;
}

Terrrarium.prototype.listSurroundings = function(center) {
  var result = {};
  var grid = this.grid;
  directions.each(function(name, direction) {
    var place = center.add(direction);
    if (grid.isInside(place))
      result[name] = characterFromElement(grid.valueAt(place));
    else
      result[name] = "#";
  });
  return result;
}

Terrrarium.prototype.processCreature = function(creature, point) {
  var action = creature.act(this.listSurroundings(point));

  if (action.type == "move" && directions.contains(action.direction)) {
    var to = point.add(directions.lookup(action.direction));
    if (this.grid.isInside(to) && this.grid.valueAt(to) == undefined)
      this.grid.moveValue(point, to);
  }
  else {
    throw new Error("Unsupported action: " + action.type);
  }
};

Terrrarium.prototype.step = function() {
  forEach(this.listActingCharacters(), bind(this.processCreature, this));
}

var terrarium = new Terrrarium(thePlan);
terrarium.step();
print(terrarium);

Point.prototype.toString = function() {
  return "(" + this.x + "," + this.y + ")";
}

=======
function Point(x,y){
  this.x = x;
  this.y = y;
}

Point.prototype.add = function(other) {
<<<<<<< HEAD
	return new Point(this.x + other.x, this.y + other.y);
}
>>>>>>> 4a22786... points in space
=======
  return new Point(this.x + other.x, this.y + other.y);
}

var gridA = [["0,0", "1,0", "2,0"],
            ["0,1", "1,1", "2,1"]];

gridA[1][2];
//=> "2,1"

var gridB = ["0,0", "1,0", "2,0",
            "0,1", "1,1", "2,1"];

gridB[2 + 1 * 3];
//=> "2,1"

function Grid(width, height) {
  this.width = width;
  this.height = height;
  this.cells = new Array(width * height);
} 

Grid.prototype.valueAt = function(point) {
  return this.cells[point.y * this.width + point.x];
};

Grid.prototype.setValueAt = function(point, value) {
  this.cells[point.y * this.width + point.x] = value;
};

Grid.prototype.isInside = function(point) {
  return  point.x >= 0 && point.y >= 0 &&
          point.x < this.width && point.y < this.height;
};

Grid.prototype.moveValue = function(from, to) {
  this.setValueAt(to, this.valueAt(from));
  this.setValueAt(from, undefined);
}
>>>>>>> 3268d64... representing the grid

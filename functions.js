function displayScore()
{
    $('h2').html("SCORE : " + score);
}

function restartGame()
{
    score = 0;
    displayScore();
    gridInit();
    setNumber();
    setNumber();
    refreshGrid();
}

// CHECK WIN

function checkWin()
{
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if(grid[i][j] == '2048')
            {
                if($(".victory").is(":hidden"))
                $(".victory").show("slow");
            }
        }  
    }
}

// CHECK LOOSE

function countEmptyCells()
{
    var empty = 0;
    for (var i = 0; i < 4; i++) 
    {
        for (var j = 0; j < 4; j++) 
        {
           if(grid[i][j].length<1)
           {
               empty++;
           } 
        }
    }
    return empty;
}

function checkLoose()
{
    var tempGrid = duplicate(grid);

    moveDown(true);  // parameter true means that the score won't be applied during the move test.
    if(!arrayIsEqual(tempGrid, grid))
    {
        grid = duplicate(tempGrid);
        return false;
    }
    grid = duplicate(tempGrid);
    moveLeft(true);
    if(!arrayIsEqual(tempGrid, grid))
    {
        grid = duplicate(tempGrid);
        return false;
    }
    grid = duplicate(tempGrid);
    moveUp(true);
    if(!arrayIsEqual(tempGrid, grid))
    {
        grid = duplicate(tempGrid);
        return false;
    }
    grid = duplicate(tempGrid);
    moveRight(true);
    if(!arrayIsEqual(tempGrid, grid))
    {
        grid = duplicate(tempGrid);
        return false;
    }
    grid = duplicate(tempGrid);
    return true;
}

function duplicate(array)
{
    var tempGrid = new Array(4)
    for(let i = 0; i < 4; i++){
        tempGrid[i] = new Array(4);
    }

    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            tempGrid[i][j] = array[i][j];
        }
    }

    return tempGrid;
}

function arrayIsEqual(array1, array2)
{
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) 
        {
            if(array1[i][j] !== array2[i][j])
            {
                return false;
            }
        }
        
    }
    return true;
}


//GRID INITIALIZATION
function gridInit()
{
    grid = new Array(4);
    for(let i = 0; i < grid.length; i++){
        grid[i] = new Array(4);
    }
    for(var i = 0; i < grid.length; i++){
        for(var j = 0; j < grid[i].length; j++){
            grid[i][j] = "";
        }
    }
}


//GRID TO HTML

function refreshGrid()
{
    $("#first-cell-1").html(grid[0][0]).css("background-color", setBgColor(grid[0][0]));
    $("#first-cell-2").html(grid[0][1]).css("background-color", setBgColor(grid[0][1]));
    $("#first-cell-3").html(grid[0][2]).css("background-color", setBgColor(grid[0][2]));
    $("#first-cell-4").html(grid[0][3]).css("background-color", setBgColor(grid[0][3]));
    $("#second-cell-1").html(grid[1][0]).css("background-color", setBgColor(grid[1][0]));
    $("#second-cell-2").html(grid[1][1]).css("background-color", setBgColor(grid[1][1]));
    $("#second-cell-3").html(grid[1][2]).css("background-color", setBgColor(grid[1][2]));
    $("#second-cell-4").html(grid[1][3]).css("background-color", setBgColor(grid[1][3]));
    $("#third-cell-1").html(grid[2][0]).css("background-color", setBgColor(grid[2][0]));
    $("#third-cell-2").html(grid[2][1]).css("background-color", setBgColor(grid[2][1]));
    $("#third-cell-3").html(grid[2][2]).css("background-color", setBgColor(grid[2][2]));
    $("#third-cell-4").html(grid[2][3]).css("background-color", setBgColor(grid[2][3]));
    $("#fourth-cell-1").html(grid[3][0]).css("background-color", setBgColor(grid[3][0]));
    $("#fourth-cell-2").html(grid[3][1]).css("background-color", setBgColor(grid[3][1]));
    $("#fourth-cell-3").html(grid[3][2]).css("background-color", setBgColor(grid[3][2]));
    $("#fourth-cell-4").html(grid[3][3]).css("background-color", setBgColor(grid[3][3]));  
}

// RANDOMISATION

function getTwoOrFor()
{
    var minNumber = 0; // MIN
    var maxNumber = 100; // MAX
    var randomnumber = Math.floor(Math.random() * (maxNumber + 1) + minNumber);
    if(randomnumber >= 0 && randomnumber <= 10)
        return '4';
    else if(randomnumber > 10 && randomnumber <= 100)
        return '2';    
}

function setNumber()
{
    var number = getTwoOrFor();
    var gridPositionX = Math.floor((Math.random() * 4) + 0);
    var gridPositionY = Math.floor((Math.random() * 4) + 0);
    if(grid[gridPositionX][gridPositionY].length<1)
        grid[gridPositionX][gridPositionY] = number;
    else if (countEmptyCells() > 0)
        setNumber();
}

// MOVES

function moveRight(isCheckLoose)  //isCheckLoose parameter is true if the function is used in checkLoose()
{
    for (var i = 0; i < 4; i++) 
    {
        var tempGrid = [];   // Temporary array. Stock non empty cells of the readen line 
        var filled = 0; // 
        for (var j = 0; j < 4; j++) 
        {
            if(grid[i][j].length > 0)
            {
                tempGrid.push(grid[i][j]); // Put the non empty cells at the beggining of the temporary array.
                filled++;
            }
        }
        for (var k = 4; k > filled; k--) 
            tempGrid.unshift('');        
        var finalGrid = addNumbersRight(tempGrid, isCheckLoose);      
        for (var j = 0; j < 4; j++)
            grid[i][j] = finalGrid[j];      
    }   
}

function moveLeft(isCheckLoose)
{
    for (var i = 0; i < 4; i++) 
    {
        var tempGrid = [];
        var filled = 0;
        for (var j = 0; j < 4; j++) 
        {
            if(grid[i][j].length > 0)
            {
                tempGrid.push(grid[i][j]);
                filled++;
            }
        }
        for (var k = 4; k > filled; k--) 
            tempGrid.push('');
        var finalGrid = addNumbersLeft(tempGrid, isCheckLoose); 
        for (var j = 0; j < 4; j++)
            grid[i][j] = finalGrid[j];      
    }   
}

function moveUp(isCheckLoose)
{
    for (var i = 0; i < 4; i++) 
    {
        var tempGrid = [];
        var filled = 0;
        for (var j = 0; j < 4; j++) 
        {
            if(grid[j][i].length > 0)
            {
                tempGrid.push(grid[j][i]);
                filled++;
            }
        }
        for (var k = 4; k > filled; k--) 
            tempGrid.push('');
        var finalGrid = addNumbersLeft(tempGrid, isCheckLoose);    
        for (var j = 0; j < 4; j++)
            grid[j][i] = finalGrid[j];      
    }   
}

function moveDown(isCheckLoose)
{
    for (var i = 0; i < 4; i++) 
    {
        var tempGrid = [];
        var filled = 0;
        for (var j = 0; j < 4; j++) 
        {
            if(grid[j][i].length > 0)
            {
                tempGrid.push(grid[j][i]);
                filled++;
            }
        }
        for (var k = 4; k > filled; k--) 
            tempGrid.unshift('');
        var finalGrid = addNumbersRight(tempGrid, isCheckLoose);
        for (var j = 0; j < 4; j++)
            grid[j][i] = finalGrid[j];      
    }   
}

// ADDING NUMBERS

function addNumbersRight(tempGrid, isCheckLoose)       //WORKS FOR RIGHT AND DOWN
{
    var finalGrid = [];
    var empty = 0;
    for (var i = 3; i >= 0; i--) 
    {
        if(tempGrid[i].length>0)
        {
            if(tempGrid[i] == tempGrid[i-1])
            {
                finalGrid.unshift(String(tempGrid[i]*2));
                tempGrid[i-1] = '';
                if(!isCheckLoose)    //if the function is used in gaming conditions (not in checkLoose), the score is applied.
                {
                    score += tempGrid[i]*2;
                    displayScore();
                }
            }
            else
            finalGrid.unshift(tempGrid[i]);
        }
        else
        empty++;
    }
    for (var j = 0; j < empty; j++)
        finalGrid.unshift(''); 
    return finalGrid;
}

function addNumbersLeft(tempGrid, isCheckLoose)    //WORKS FOR LEFT AND UP
{
    var finalGrid = [];
    var empty = 0;
    for (var i = 0; i < 4; i++) 
    {
        if(tempGrid[i].length>0)
        {
            if(tempGrid[i] == tempGrid[i+1])
            {
                finalGrid.push(String(tempGrid[i]*2));
                tempGrid[i+1] = '';
                if(!isCheckLoose)
                {
                    score += tempGrid[i]*2;
                    displayScore();
                }
            }
            else
            finalGrid.push(tempGrid[i]);
        }
        else
        empty++;
    }
    for (var j = 0; j < empty; j++)
        finalGrid.push(''); 
    return finalGrid;
}

// CELL COLORS

function setBgColor(cell)
{
    switch(Number(cell))
    {
        case 0 :
            return "black";
        case 2 :
            return "#FFFB0D";
        case 4 :
            return "#EBCD09";
        case 8 :
            return "#FFBF01";
        case 16 :
            return "#E8970C";
        case 32 :
            return "#FF830D";
        case 64 :
            return "#FF4F0D";
        case 128 :
            return "#EB2109";
        case 256 :
            return "#FF0037";
        case 512 :
            return "#E80CB7";
        case 1024 :
            return "#D30DFF";
        case 2048 :
            return "#810DFF";                            
    }
}

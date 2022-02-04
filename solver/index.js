const sudokuController = (function () { 

    const sudokuArrayInput = [];
    const answerArray = [];
    const boxPattern =     [[0, 0], [0, 1], [0, 2],
                            [1, 0], [1, 1], [1, 2],
                            [2, 0], [2, 1], [2, 2]]
    const wrapper = document.getElementsByClassName("sudoku")[0];

    var sudoku = [];                                            //cria o array


    for(let i = 0; i < 81; i++){
        const numberInput = document.createElement("input");    //cria o input
        numberInput.type = "numero";                            //seta o type
        numberInput.classList.add("numero");                   //seta os valores nulos como números também
        numberInput.setAttribute("id",i);                       //seta um id pra cada elemento
        
        sudokuArrayInput[i] = numberInput;
        wrapper.appendChild(numberInput);
    }
    
    
    solve = function(){
        debugger;
        finished = false;

        sudoku = splitSudoko(sudokuArrayInput);
        answerArray = solving(sudoku);
        changeBoard(answerArray,sudoku);
    }
    
    solving = function(sudoko){

        if(finished(sudoku)){
            return sudoko;
        }else{
            let cleanSolutions = removeSolutions(validSolution(sudoko));

        }
        
    }
    
    changeBoard = function(solved,unsolved){
        
    }
    
    isValid = function(sudoko){
        return sudokoValidCell(sudoko);
    }
    
    sudokoValidCell = function(sudoko){
        //check rows
        for (let i = 0; i < 9; i++){
            let temp = []

            for (let j = 0; j < 9; j++){
                if (temp.includes(sudoko[i][j])){
                    return false
                }
                else if (sudoko[i][j] != null){
                    temp.push(sudoko[i][j])
                }
            }
        }

        //check columns
        for (let i = 0; i < 9; i++){
            let temp = []
            for (let j = 0; j < 9; j++){
                if (temp.includes(sudoko[j][i])){
                    return false
                }
                else if (sudoko[j][i] != null){
                    temp.push(sudoko[j][i])
                }
            }
        }

        for (var i = 0; i < 9; i += 3){
            for (var j = 0; j < 9; j += 3){
                let temp = []
                
                for (var i = 0; i < 9; i++){
                    let coordinates = [...boxPattern[i]]

                    coordinates[0] += i
                    coordinates[1] += j
                    if (cur.includes(board[coordinates[0]][coordinates[1]])){
                        return false
                    }
                    else if (board[coordinates[0]][coordinates[1]] != null){
                        cur.push(board[coordinates[0]][coordinates[1]])
                    }
                }
            }
        }

        return true;
    }

    finished = function(sudoku){
        let regex = new RegExp("[1-9]");
        
        for (let cell = 0; cell < 81; cell++) {
            if(!regex.test(sudoku[cell])){
                return false
            }
            return true
        }
    } 

    splitSudoko = function (splitSudoko) {
        let chunk = 9;

        for (let cell = 0; cell < 81; cell++) {
            splitSudoko[cell] = parseInt(splitSudoko[cell].value || 0);
        }
    
        return splitSudoko.reduce((resultArray, item, index) => { 
            const chunkIndex = Math.floor(index/chunk)

            if(!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] 
            }

            resultArray[chunkIndex].push(item)

            return resultArray}, []) 
    }

    validSolution = function(solutions){
        let resolutions = [];
        let coordinates = findCoordinates(solutions);

        if (coordinates != null) {
            for (let index = 1; index < 10; index++){
                let newBoard = [...board] //spread
                let row = [...newBoard[coordinates[0]]]//spread

                row[coordinates[1]] = i
                newBoard[coordinates[0]] = row
                resolutions.push(newBoard)
            }
        }
        return resolutions;
    }
    
    findCoordinates = function(solutions){
        for (let i = 0; i < 9; i++){
            for (let j = 0; j < 9; j++){
                if (solutions[i][j] == 0) {
                    return [i,j]
                }
            }
        }
    }

    removeSolutions = function (sudoku) {
        var cleanSolutions = [];
        
        for (let index = 0; index < sudoku.length; index++) {
            if(isValid(sudoku[index])){
                cleanSolutions.push(sudoku[index]);
            }
        }
    }   

})();





















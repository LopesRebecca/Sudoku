const sudokuController = (function () { 
    
    const sudokuArrayInput = [];
    const boxPattern =     [[0, 0], [0, 1], [0, 2],
                            [1, 0], [1, 1], [1, 2],
                            [2, 0], [2, 1], [2, 2]]
    const wrapper = document.getElementsByClassName("sudoku")[0];
    
    var answerArray = [];

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
        let sudoku = splitSudoko(sudokuArrayInput);
        answerArray = solving(sudoku);
        changeBoard(answerArray);
    }
    
    solving = function(sudoko){

        if(finishedSolution(sudoko)){
            return sudoko;
        }else{
            let cleanSolutions = removeSolutions(validSolution(sudoko));
            return correctResult(cleanSolutions);
        }
        
    }
    
    correctResult = function(sudokus){
        if(sudokus.length < 1){
            return false;
        }else{
            var backtracking = solving(sudokus.shift());

            if(backtracking != false){
                return backtracking;
            }else{
                return correctResult(sudokus);
            }

        }
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
                else if (sudoko[i][j] != 0){
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
                else if (sudoko[j][i] != 0){
                    temp.push(sudoko[j][i])
                }
            }
        }

        for (let i = 0; i < 9; i += 3){
            for (let j = 0; j < 9; j += 3){
                let temp = []
                
                for (let k = 0; k < 9; k++){
                    let coordinates = [...boxPattern[k]]

                    coordinates[0] += i
                    coordinates[1] += j
                    if (temp.includes(sudoko[coordinates[0]][coordinates[1]])){
                        return false
                    }
                    else if (sudoko[coordinates[0]][coordinates[1]] != 0){
                        temp.push(sudoko[coordinates[0]][coordinates[1]])
                    }
                }
            }
        }

        return true;
    }

    finishedSolution = function(sudoku){
        let regex = new RegExp("[1-9]");

        for (let row = 0; row < 9; row++) {
            for (let column = 0;column < 9; column++) {
                if(!regex.test(sudoku[row][column])){
                    return false
                }
            }
        }

        return true
    } 

    splitSudoko = function (splitSudokoArray) {
        let chunk = 9;
        let splitSudokoTemp = [];

        for (let cell = 0; cell < 81; cell++) {
            splitSudokoTemp[cell] = parseInt(splitSudokoArray[cell].value || 0);
        }
    
        return splitSudokoTemp.reduce((resultArray, item, index) => { 
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
                let newBoard = [...solutions] //spread
                let row = [...newBoard[coordinates[0]]]//spread

                row[coordinates[1]] = index;
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
        return cleanSolutions;
    }   

    changeBoard = function (sudokoAnswer) {
        debugger;
        let outputSudoko = sudokoAnswer.join();
        let answer = outputSudoko.split(',');
        for (let i = 0; i < 81; i++) {
            sudokuArrayInput[i].value = answer[i];
        }
    }


})();





















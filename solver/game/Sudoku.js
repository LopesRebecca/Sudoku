var sudoku = [
    [5,0,0,3,0,1,0,0,7],
    [0,1,0,4,0,6,0,9,0],
    [0,0,8,0,5,0,4,0,0],
    [1,7,0,0,0,0,0,5,9],
    [0,0,6,0,0,0,7,0,0],
    [4,2,0,0,0,0,0,8,3],
    [0,0,4,0,2,0,3,0,0],
    [0,8,0,7,0,5,0,2,0],
    [2,0,0,9,0,4,0,0,5],
];

var sudoku2 = [
    [5,0,0,3,0,1,0,0,7],
    [0,1,0,4,0,6,0,9,0],
    [0,0,8,0,5,0,4,0,0],
    [1,7,0,0,0,0,0,5,9],
    [0,0,6,0,0,0,7,0,0],
    [4,2,0,0,0,0,0,8,3],
    [0,0,4,0,2,0,3,0,0],
    [0,8,0,7,0,5,0,2,0],
    [2,0,0,9,0,4,0,0,5],
];

var area = [];

possibilidades_area(); // possibilidades para completar o suduko

//enquanto o suduko não estiver completo faça
while(!sudoku_completo()){
    teste_colunas();
    teste_bloco();
    teste_possibilidades_area();
}
//pronto para printar
window.onload = function (){
    print(sudoku);
}

//possilidade numericas 0 a 9
function possibilidades_area(){
    for(var i = 0; i < 9; i++){
        area[i] = [];
    }

    for(var i=0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            area[i][j] = [];
        }
    }

    for(var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            for(var k = 0; k < 9; k++){
                area[i][j][k] = k + 1;
            }
        }
    }
}

//printar o suduko como tabela
function print_sudoku(sudoku) {

}





















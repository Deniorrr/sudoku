// class Squares {
//     constructor(){
//         this.squares = 
//         [
//             [0,1,2,9,10,11,18,19,20],
//             [3,4,5,12,13,14,21,22,23],
//             [6,7,8,15,16,17,24,25,26],
//             [27,28,29,36,37,38,45,46,47],
//             [30,31,32,39,40,41,48,49,50],
//             [33,34,35,42,43,44,51,52,53],
//             [54,55,56,63,64,65,72,73,74],
//             [57,58,59,66,67,68,75,76,77],
//             [60,61,62,69,70,71,78,79,80]
//         ];
//     }
// }

class Sudoku{
    constructor(){
        this.inner = "";
        this.table= [];
        this.tilemap = [[],[],[],[],[],[],[],[],[],[]];
        this.filltilemap();
        this.squares = 
        [
            [0,1,2,9,10,11,18,19,20],
            [3,4,5,12,13,14,21,22,23],
            [6,7,8,15,16,17,24,25,26],
            [27,28,29,36,37,38,45,46,47],
            [30,31,32,39,40,41,48,49,50],
            [33,34,35,42,43,44,51,52,53],
            [54,55,56,63,64,65,72,73,74],
            [57,58,59,66,67,68,75,76,77],
            [60,61,62,69,70,71,78,79,80]
        ];
        this.onetile = false
    }

    draw_table(){
        let element = document.getElementById("container");
        this.inner = "<table>";
        for(let row = 0; row<9; row++)this.draw_row(row);
        this.inner += "</table>";
        element.innerHTML = this.inner;
    }
    draw_row(row){
        this.inner += "<tr>"
        for(let col = 0; col<9; col++)this.draw_cell(row, col);
        this.inner += "</tr>";
    }
    draw_cell(row, col){
        //this.inner += "<td>"+ ((i*9)+j) +"</td>"
        this.inner += "<td><input type='number' min='1' max='9' id='t" + this.return_tile(row,col) + "'></td>"
    }
    filltilemap(){
        for(let digit = 0; digit<10; digit++)
        {
            for(let tile = 0; tile<81; tile++)
            {
                this.tilemap[digit][tile] = false
            }
        }  
    }
    return_tile(row, col){
        return ((row*9)+col)
    }
    set_column(tile){
        let column = tile%9;
        for(let i=column; i<81; i+=9)
        {
                this.tilemap[this.table[tile]][i] = true;
        }
    }
    set_row(tile){
        let row = Math.floor(tile/9);
        let endofrow = ((9*row)+9);
        for(let i=row*9; i<endofrow; i++)
        {
                this.tilemap[this.table[tile]][i] = true;
        }
    }
    set_square(j){
        for(let i = 0; i<9; i++)
        {
            if(this.squares[i].includes(j))
            {
                for(let k = 0; k<9; k++)
                {
                    this.tilemap [this.table[j]][this.squares[i][k]] = true;
                }
            }
        }
    }
    assign_tilemap(){
        for(let tile = 0; tile<81; tile++)
        if(this.table[tile]!=0)
        {
            this.set_column(tile);
            this.set_row(tile);
            this.set_square(tile);
        } 
    }
    set_table(){
        for(let i= 0; i<81; i++)
        {
            if(document.getElementById("t" + i).value == ""){this.table[i] = 0;}
            else{
                this.table[i] = document.getElementById("t" + i).value;
                for(let j = 0; j<10; j++)
                {
                    this.tilemap[j][i] = true;
                }
                }
        }
        this.assign_tilemap();
    }
    draw_help(k){
        this.inner = "<table>";
        for(let i = 0; i<9; i++)
        {
            this.inner += "<tr>"
            for(let j = 0; j<9; j++)
            {
                this.inner += "<td>";
                if(this.tilemap[k][((i*9)+j)]) this.inner += "T";
                this.inner += "</td>"; 
            }
            this.inner += "</tr>";
        }
        this.inner += "</table>";
        document.getElementById("wynik").innerHTML = this.inner;
    }
    //solver
    find_one_tile(k){
        this.onetile = true
        for(let k=1; k<=9; k++)
        {
            if(this.onetile)
            {
                this.find_inrow(k);
            }else{
                break;
            }
            if(this.onetile)
            {
                this.find_incolumn(k);
            }else{
                break;
            }
            if(this.onetile)
            {
                this.find_insquare(k);
            }else{
                break;
            }
        }
        if(this.onetile){
            this.find_intile();
        }
        if(this.onetile)
        {
            document.getElementById("prompt").innerHTML = "I can't find anything";
        }
    }
    find_many_tiles(k){
        for(let k=1; k<=9; k++)
        {
            this.find_inrow(k);
            this.find_incolumn(k);
            this.find_insquare(k);
        }
        this.find_intile();
    }
    find_inrow(k){
        for(let j = 0; j<9; j++)
        {
            let possibilities = 0;
            let possible_tile = -1;
            let i = 0;
            for(i = 0; i<9; i++)
            {
                if(!this.tilemap[k][((j*9)+i)])
                {
                    possibilities+=1;
                    possible_tile = ((j*9)+i)
                }
            }
            if(possibilities==1)
            {
                document.getElementById("t" + possible_tile).value = k;
                sudoku.set_table();
                if(this.onetile){
                    this.onetile = false
                    break;
                }
            }
        }
    }
    find_incolumn(k){
        for(let j = 0; j<9; j++)
        {
            let possibilities = 0;
            let possible_tile = -1;
            let i = 0;
            for(i = 0; i<9; i++)
            {
                if(!this.tilemap[k][((i*9)+j)])
                {
                    possibilities+=1;
                    possible_tile = ((i*9)+j)
                }
            }
            if(possibilities==1)
            {
                document.getElementById("t" + possible_tile).value = k;
                sudoku.set_table();
                if(this.onetile){
                    this.onetile = false
                    break;
                }
            }
        }
    }
    find_insquare(k){
        for(let j = 0; j<9; j++)
        {
            let possibilities = 0;
            let possible_tile = -1;
            let i = 0;
            for(i = 0; i<9; i++)
            {
                if(!this.tilemap[k][this.squares[j][i]])
                {
                    possibilities+=1;
                    possible_tile = this.squares[j][i]
                }
            }
            if(possibilities==1)
            {
                document.getElementById("t" + possible_tile).value = k;
                sudoku.set_table();
                if(this.onetile){
                    this.onetile = false
                    break;
                }
            }
        }
    }
    find_intile(){
        for(let j = 0; j<81; j++)
        {
            let possibilities = 0;
            let possible_digit = -1
            for(let i = 1; i<=9; i++){
                if(!this.tilemap[i][j]){
                    possibilities+=1;
                    possible_digit = i;
                }
            }
            if(possibilities==1)
            {
                document.getElementById("t" + j).value = possible_digit;
                sudoku.set_table();
                if(this.onetile){
                    this.onetile = false
                    break;
                }
            } 
        }
    }
}

const sudoku = new Sudoku;
sudoku.draw_table();

document.getElementById("zapisz").addEventListener('click', ()=>{
    sudoku.set_table();
})  

document.getElementById("znajdz").addEventListener('click', ()=>{
    sudoku.find_many_tiles();
})  

document.getElementById("znajdz_jeden").addEventListener('click', ()=>{
    sudoku.find_one_tile();
}) 

document.getElementById("clear").addEventListener('click', ()=>{
    location.reload();
}) 

function b(k){
    sudoku.draw_help(k);
}
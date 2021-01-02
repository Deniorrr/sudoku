class Squares {
    constructor(){
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
    }
}

class Sudoku{
    constructor(){
        this.inner = "";
        this.table= [];
        this.tilemap = [[],[],[],[],[],[],[],[],[],[]];
        this.filltilemap();
        this.squares = new Squares;
    }

    draw_table(){
        let element = document.getElementById("container");
        this.inner = "<table>";
        for(let i = 0; i<9; i++)this.draw_row(i);
        this.inner += "</table>";
        element.innerHTML = this.inner;
    }
    draw_row(i){
        this.inner += "<tr>"
        for(let j = 0; j<9; j++)this.draw_cell(i, j);
        this.inner += "</tr>";
    }
    draw_cell(i, j){
        //this.inner += "<td>"+ ((i*9)+j) +"</td>"
        this.inner += "<td><input type='number' min='1' max='9' id='t" + ((i*9)+j) + "'></td>"
    }
    filltilemap(){
        for(let i = 0; i<10; i++)
        {
            for(let j = 0; j<81; j++)
            {
                this.tilemap[i][j] = false
            }
        }  
    }
    set_column(j){
        let column = j%9;
        for(let i=column; i<81; i+=9)
        {
                this.tilemap[this.table[j]][i] = true;
        }
    }
    set_row(j){
        let row = Math.floor(j/9);
        let endofrow = ((9*row)+9);
        for(let i=row*9; i<endofrow; i++)
        {
                this.tilemap[this.table[j]][i] = true;
        }
    }
    set_square(j){
        for(let i = 0; i<9; i++)
        {
            if(this.squares.squares[i].includes(j))
            {
                for(let k = 0; k<9; k++)
                {
                    this.tilemap [this.table[j]][this.squares.squares[i][k]] = true;
                }
            }
        }
    }
    assign_tilemap(){
        for(let j = 0; j<81; j++)
        if(this.table[j]!=0)
        {
            this.set_column(j);
            this.set_row(j);
            this.set_square(j);
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
    find_sth(){
        for(let i=1; i<=9; i++)
        {
            this.find_one_tile(i)
        }
    }
    find_one_tile(k){
        this.find_inrow(k);
        this.find_incolumn(k);
        //this.find_insquare(k);
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
                //return true;
            }else{
               // return false;
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
                //return true;
            }else{
                //return false;
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
                if(!this.tilemap[k][this.squares.squares[j][i]])
                {
                    possibilities+=1;
                    possible_tile = ((i*9)+j)
                }
            }
            if(possibilities==1)
            {
                document.getElementById("t" + possible_tile).value = k;
                sudoku.set_table();
                return true;
            }
        }
        return false;
    }
}

const sudoku = new Sudoku;
sudoku.draw_table();

document.getElementById("zapisz").addEventListener('click', ()=>{
    sudoku.set_table();
})  

document.getElementById("znajdz").addEventListener('click', ()=>{
    sudoku.find_sth();
})  

function b(k){
    sudoku.draw_help(k);
}
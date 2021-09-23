let s=180;
let board=new Array(5);
for(let i=0;i<5;i++)    board[i]=new Array(8);
for(let i=0;i<5;i++)    for(let j=0;j<8;j++)    board[i][j]=[];
let enasite=new Array(5);
for(let i=0;i<5;i++)    enasite[i]=new Array(8);
let mode=0,c,r,turn,fturn,c1=-1,c2=-1,r1=-1,r2=-1;

function setup(){
    createCanvas(windowWidth,windowHeight);

    for(let i=0;i<5;i++){
        board[i][6][0]=0;
        board[i][1][0]=1;
    }
    
}

function draw(){
    background(255);

    noStroke(),fill(200);
    rect(0.2*s,s,5*s,6*s);
    stroke(0);
    for(let i=0;i<6;i++)    line(0.2*s+i*s,s,0.2*s+i*s,7*s);
    for(let i=0;i<7;i++)    line(0.2*s,s+i*s,5.2*s,s+i*s);

    for(let i=0;i<5;i++)    for(let j=0;j<8;j++){

        if(enasite[i][j]){
            stroke('#ff7700'),noFill(),strokeWeight(4);
            rect(0.2*s+i*s,j*s,s,s);
            stroke(0),strokeWeight(1);
        }
        noStroke(),fill(160);
        if(((i==c1&&j==r1)||(i==c2&&j==r2))&&j>0&&j<7){
            rect(0.2*s+i*s+1,j*s+1,s-2,s-2);
        }

        stroke(0);
        strokeWeight(3);
        rectMode(CENTER);
        for(let k=0;k<board[i][j].length;k++)    if(board[i][j][k]!=undefined){
            if(board[i][j][k]==0)   fill('#7777ff');
            else    fill('#ffffff');
            rect(0.2*s+i*s+s/2,j*s+s/2,s*(0.8-0.2*k),s*(0.8-0.2*k),5);
        }
        rectMode(CORNER);
        strokeWeight(1);
    }
}

function mouseClicked(){

    let flag=false;
    if(mouseX>=0.2*s&&mouseX<s*5.2&&mouseY>=0&&mouseY<s*8){
        for(let i=0;i<5;i++)    for(let j=0;j<8;j++){
            if(mouseX>=(i+0.2)*s&&mouseX<(i+1.2)*s&&mouseY>=j*s&&mouseY<(j+1)*s){
                if(enasite[i][j]){
                    board[i][j][board[i][j].length]=turn;
                    board[c][r].length--;
                    c1=c,r1=r,c2=i,r2=j;
                    flag=true;
                }else{
                    let len=board[i][j].length;
                    if(len>0){
                        if(board[i][j][len-1]==0||board[i][j][len-1]==1){
                            turn=board[i][j][len-1];
                            c=i,r=j;
                            enable(i,j,turn);
                        }else   flag=true;
                    }else   flag=true; 
                }   
            }
        }
    }else   flag=true;
    if(flag)    for(let i=0;i<5;i++)    for(let j=0;j<8;j++)    enasite[i][j]=false;
    
}

function enable(c,r,t){
    let dir=[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];
    for(let i=0;i<5;i++)    for(let j=0;j<8;j++)    enasite[i][j]=false;
    for(let i=0;i<8;i++){
        if(ins(c+dir[i][0],r+dir[i][1],t)){
            if(board[c+dir[i][0]][r+dir[i][1]].length<3)    enasite[c+dir[i][0]][r+dir[i][1]]=true;
        }
    }
}

function ins(c,r,t){
    let r1,r2;
    if(t==0){
        r1=0,r2=7;
    }else{
        r1=1,r2=8;
    }
    if(c>=0&&c<5&&r>=r1&&r<r2)    return true;
    else    return false;
}

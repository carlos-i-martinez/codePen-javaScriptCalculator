var number = '';
var display = [];
var decimal = false;
function update(op,ar){
    var i = ar.indexOf(op);
    var num = 0;
    switch(op){
        case 'x':               
                num = Number(ar[i-1])*Number(ar[i+1]);
                break;
        case '/':               
                num = Number(ar[i-1])/Number(ar[i+1]);
                break;
        case '+':              
                num = Number(ar[i-1])+Number(ar[i+1]);
                break;
        case '-':                
                num = Number(ar[i-1])-Number(ar[i+1]);
                break;
    }
    ar.splice(i-1,3,num);
    return ar;
}
function myFunction(a) {
    if(a.length == 1)
    {
        return Number(a[0]);
    }
    else {
        if(a.indexOf("x")!=-1 && a.indexOf("/")!=-1){
            if(a.indexOf("x")<=a.indexOf("/")){
                return myFunction(update('x',a));
            }
            else {
                return myFunction(update('/',a));
            }
        }
        else if (a.indexOf("x")!=-1){
                return myFunction(update('x',a));
        }
        else if (a.indexOf("/")!=-1){
                return myFunction(update('/',a));
        }
        else if(a.indexOf("+")!=-1 && a.indexOf("-")!=-1){
            if(a.indexOf("+")<=a.indexOf("-")){
                return myFunction(update('+',a));
            }
            else {
                return myFunction(update('-',a));
            }
        }
        else if (a.indexOf("+")!=-1){
                return myFunction(update('+',a));
        }
        else if (a.indexOf("-")!=-1){
                return myFunction(update('-',a));
        } 
    }
}

function bclick(e) {
  switch(e) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
            if(number != '0'){
              number = number.concat(e);
              document.getElementById('display').innerHTML = display.join(' ')+' '+number;
              document.getElementById('display1').innerHTML = number;
              break;
            }
            else if(number == '0' && e != '0') {
              number = e;
              document.getElementById('display').innerHTML = display.join(' ')+' '+number;
              document.getElementById('display1').innerHTML = number;
              break;
            }
            else {
              break;
            }
    case '.':
            if(decimal == false) {
                number = number.concat(e);
                document.getElementById('display').innerHTML = display.join(' ')+' '+number;
                document.getElementById('display1').innerHTML = number;
                decimal = true;
                break;
            }
            else {
              break;
            }
    case 'c':
            number = '';
            decimal = false;
            display = [];
            document.getElementById('display').innerHTML = '0';
            document.getElementById('display1').innerHTML = '0';
            break;
    case 'x':
    case '/':
    case '+':
    case '-':
            if(number != ''){
                  display.push(number);
            }
            if(['x','/','+','-'].includes(display[display.length-1]) && display.length>0){
              display[display.length-1] = e;
              number = '';
              document.getElementById('display').innerHTML = display.join(' ');
              document.getElementById('display1').innerHTML = e;
              break;
            }
            else {
              
              number = '';
              display.push(e);
              decimal = false;
              document.getElementById('display').innerHTML = display.join(' ');
              document.getElementById('display1').innerHTML = e;
              break;
            }
      case '=':
            if(number != ''){
                  display.push(number);
            }
            
            if(['x','/','+','-'].includes(display[display.length-1])) {
              document.getElementById('display1').innerHTML = "PLEASE ENTER NUMBER:";
              break;
            }
            number = roundToFour(myFunction(display));
            document.getElementById('display').innerHTML = number;           
            decimal = false;
            document.getElementById('display1').innerHTML = number;
            display = [];
            break;
  }
}

function roundToFour(num) {
      if(num > 1 || num < -1)
      {
        var n =  Math.round(num * 10000) / 10000;
        if(n.toString().indexOf('e')!= -1)
        {
            return n.toPrecision(4);
        }
        return n;
      }
      return num;
}
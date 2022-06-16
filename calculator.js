function add(a,b){
    return a+b;
}

function substract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(operater,a,b){
    return operater(a,b);
}

function fill_display(text){
    let display=document.querySelector('#display');
    display.textContent+=text;
}

let expression={
    a:"",operation:null,b:""
}

function calculate(){
    
    let result;
    const display=document.querySelector('#display');
    const digits=document.querySelectorAll('.numbers');
    const operations=document.querySelectorAll('.operator');
    mathoperators=document.querySelectorAll('.math');


    digits.forEach(digit => {
        digit.addEventListener('click',function fillvariable(){
            if (expression.operation==null){
                expression.a+=digit.textContent;
                fill_display(digit.textContent);
            }
            else
            {
                expression.b+=digit.textContent;
                fill_display(digit.textContent);
            }
        });
    })


    mathoperators.forEach(mathoperation=>{
        mathoperation.addEventListener('click',()=>{
            if (expression.operation==null){
            expression.operation=mathoperation.id;
            fill_display(mathoperation.textContent);
            }
        });
    })
    const evaloperators=document.querySelectorAll('.eval');
    evaloperators.forEach(evaloperator=>{
        evaloperator.addEventListener('click',()=>evaluation(evaloperator));
    })

    const clear=document.querySelector('#AC');
    clear.addEventListener('click',()=>{
        display.textContent='';
        expression.a="";
        expression.operation=null;
        expression.b="";
    })

    const back=document.querySelector('#back');
    back.addEventListener('click',backspace);
}


function evaluation(evaloperator){
    if (expression.operation!=null && expression.b!=""){
        console.log(expression);
        expression.a=parseInt(expression.a);
        expression.b=parseInt(expression.b);
        if (expression.operation=="add"){
            result=operate(add,expression.a,expression.b);
        }
        else if (expression.operation=="substract"){
            result=operate(substract,expression.a,expression.b);
            
        }
        else if (expression.operation=="multiply"){
            result=operate(multiply,expression.a,expression.b);
            
        }
        else if (expression.operation=="divide"){
            result=operate(divide,expression.a,expression.b);
            
        }
        result=Math.round(result*10000)/10000;
        display.textContent=result;
        expression.a=result;
        expression.b="";
        if (evaloperator.id!="equal"){
            expression.operation=evaloperator.id;
            fill_display(evaloperator.textContent);
        }
        else {
            expression.operation=null;
        }
    }

    else if ((expression.operation!=null && expression.b=="")&&evaloperator.id!="equal"){
        expression.operation=evaloperator.id;
        display.textContent=display.textContent.slice(0,display.textContent.length-1)+evaloperator.textContent;
    }
}

function backspace(back){
    if ((expression.b==''&&expression.a!='')&&expression.operation!=null){
        expression.operation=null;
    }
    else if((expression.a!=''&&expression.operation!=null)&&expression.b!=''){
        expression.b=expression.b.slice(0,expression.b.length-1);
    }
    else if((expression.b==''&&expression.operation==null)&&expression.a!=''){
        expression.a=expression.a.slice(0,expression.a.length-1);
    }

    display.textContent=display.textContent.slice(0,display.textContent.length-1);

}


calculate();
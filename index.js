$(document).ready(function(){

    // jQuery methods go here...

    var arr = [];

    let head


    // create array and push values letter by letter to it


    var E = [["T","X"]];
    var X = [["+","T","X"],[null]];
    var T = [["F","Y"]];
    var Y = [["*","F","Y"],[null]];
    var F = [["(","E",")"],["i"]];

    var parseTable = [E,X,T,Y,F];
    
    var stack = [];

    // get the first element of the array and start with E to start the parsing

    stack.push("$");
    stack.push("E");

    function pushStack() {

        // let xbool = false;
        // let ybool = false;

        let temp = stack.pop();

        if(temp === "E"){
            stack.push(E[0][1]); // push X
            stack.push(E[0][0]); // push T
            return "T";
        }
        else if(temp === "X"){
            if(head === "+") {
                stack.push(X[0][2]); // push X
                stack.push(X[0][1]); // push T
                stack.push(X[0][0]); // push +
                // xbool = true;
                return "+";
            }
            else{
                // stack.push(X[1][0]); // push null
                return temp;
            }
        }
        else if(temp === "T"){
            stack.push(T[0][1]); // push Y
            stack.push(T[0][0]); // push F
            return "F";
        }
        else if(temp === "Y"){
            if(head === "*") {
                stack.push(Y[0][2]); // push Y
                stack.push(Y[0][1]); // push F
                stack.push(Y[0][0]); // push *
                // ybool = true;
                return "*";
            }
            else{
                // stack.push(Y[1][0]); // push null
                return temp;
            }
        }
        else if(temp === "F"){
            if(head === "("){
                stack.push(F[0][2]); // push )
                stack.push(F[0][1]); // push E
                stack.push(F[0][0]); // push (
                return "(";
            }
            else if(head === "i"){
                stack.push(F[1][0]); // push i
                return "i";
            }
        }
        else if (temp === ")"){
            if (head === ")"){
                stack.push(")");
                return ")";
            }
        }
        else if(temp === "$"){
                return "$";
        }
        else{
            return "wrong";
        }
    }

    function testString() {

        var str = $('#string').val();
        for(var i = 0; i < str.length; i++){
            arr.push(str[i]);
        }
        head = arr[0];


        console.log("stack: " + stack);
        console.log("arr: " + arr);
        for (let x = 0; x < arr.length; x++) {
            const element = arr[x];
            head = arr[x];
            
            let temp = '';
            while(element !== temp)
            {
                if(temp !== "wrong") {
                    console.log("stack: " + stack);
                    console.log("element: " + element);
                    console.log("temp: " + temp);
                    temp = pushStack();
                }
                else{
                    console.log("wrong");
                    break;
                }
            }
            // for (let index = 0; index < 100; index++) {
            //     console.log("index: " + index);
            //     if(element !== temp){
            //         console.log("stack: " + stack);
            //         console.log("element: " + element);
            //         console.log("temp: " + temp);
            //         temp = pushStack();
            //         // create p and appent to div with id div
            //     }
            //     else{
            //         console.log("befor" + stack);
            //         stack.pop();
            //         console.log("after" + stack);
            //         // temp = pushStack();
            //         let p = document.createElement("p");
            //         p.innerHTML = temp;
            //         document.getElementById("div").appendChild(p);
            //         index = 100;
            //     }
            // }  
            if(temp === "wrong") {
                let p = document.createElement("p");
                p.innerHTML = temp;
                document.getElementById("div").appendChild(p);
            }
            if(temp === "$"){
                let p = document.createElement("p");
                p.innerHTML = "end of string";
                document.getElementById("div").appendChild(p);
                break;
            }
            if(element === temp) {
                console.log("befor" + stack);
                stack.pop();
                console.log("after" + stack);
                // temp = pushStack();
                let p = document.createElement("p");
                p.innerHTML = temp;
                document.getElementById("div").appendChild(p);
            }
        }
        // empty stack
        while(stack.length > 0){
            stack.pop();
        }

    }

    $('#sub').click(function(){
        
        testString()

    });
    // stack.pop();
    // stack.push("X");
    // stack.push("T");

    // stack.pop();
    // stack.push("Y");
    // stack.push("F");

    // stack.pop();

  
  });
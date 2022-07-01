$(document).ready(function(){
    // jQuery methods go here...

    function cha() {
        var root = am5.Root.new("chartdiv");

        root.setThemes([
          am5themes_Animated.new(root)
        ]);
    
        
        
        var container = root.container.children.push(
          am5.Container.new(root, {
            width: am5.percent(100),
            height: am5.percent(100),
            layout: root.verticalLayout
          })
        );
        
        var series = container.children.push(
          am5hierarchy.Tree.new(root, {
            singleBranchOnly: false,
            downDepth: 1,
            initialDepth: 5,
            topDepth: 0,
            valueField: "value",
            categoryField: "name",
            childDataField: "children"
          })
        );
        
        series.circles.template.setAll({
          radius: 20
        });
        
        series.outerCircles.template.setAll({
          radius: 20
        });
        
        series.data.setAll(chartdata);
        series.set("selectedDataItem", series.dataItems[0]);
    }


    var arr = [];

    var chartdata = []

    let head


    // create array and push values letter by letter to it


    var E = [["T","X"]];
    var X = [["+","T","X"],[null]];
    var T = [["F","Y"]];
    var Y = [["*","F","Y"],[null]];
    var F = [["(","E",")"],["i"]];

    
    var stack = [];

    // get the first element of the array and start with E to start the parsing

    // recursive function to search all child in chartdata
    let parent = chartdata
    function searchChild(val , arr, parent) {
        $.each(parent, function(i, v) {
            console.log("pname" + v.name);
            // console.log("val" + val);
            if (v.name == val) {
                for (let j = 0; j < arr.length; j++) {
                    console.log("......................" + arr[j].name);
                        v.children.push(arr[j]);
                }
            }
            // console.log("=============>" + v.name);
            // console.log("======v=======>" + v);
            // console.log("======v.children=======>" + v.children);
            // if (parent[i].children) {
            //     // console.log('pchild: exist');
            //     if (parent[i].children.length > 0) {
            //         // console.log('pchild: exist ' + parent[i].children.length);
            //         for (let j = 0; j < parent[i].children.length; j++) {
            //             // console.log('pchild: exist ' + parent[i].children[j].name);
            //             searchChild(val, arr, parent[i].children[j]);
            //         }
            //     }
            // }
            
        });
        $.each(parent, function(i, v) {
            $.each(v.children, function(j, q) {
                searchChild(val, arr, q);
                console.log("===========jq===============>" + q);
            })
        });
    }

    stack.push("$");
    stack.push("E");
    chartdata.push({
        name: "E",
        children: []
    })

    function pushStack() {

        // let xbool = false;
        // let ybool = false;

        let temp = stack.pop();

        if(temp === "E"){
            stack.push(E[0][1]); // push X
            stack.push(E[0][0]); // push T
            // add to chartdata like data
            searchChild("E", [{
                name: "X",
                children: []
            },{
                name: "T",
                children: []
            }], chartdata);

            return "T";
        }
        else if(temp === "X"){
            if(head === "+") {
                stack.push(X[0][2]); // push X
                stack.push(X[0][1]); // push T
                stack.push(X[0][0]); // push +
                // add to chartdata like data
                searchChild("X", [{
                    name: "X",
                    children: []
                },{
                    name: "+",
                },{
                    name: "T",
                    children: []
                }], chartdata);
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
            // find all child with name T and add to it
            searchChild("T", [{
                name: "Y",
                children: []
            },{
                name: "F",
                children: []
            }], chartdata);

            return "F";
        }
        else if(temp === "Y"){
            if(head === "*") {
                stack.push(Y[0][2]); // push Y
                stack.push(Y[0][1]); // push F
                stack.push(Y[0][0]); // push *
                // add to chartdata like data
                searchChild("Y", [{
                    name: "Y",
                    children: []
                },{
                    name: "F",
                    children: []
                },{
                    name: "*",
                }], chartdata);
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
                // add to chartdata like data
                searchChild("F", [{
                    name: "(",
                },{
                    name: "E",
                    children: []
                },{
                    name: ")",
                }], chartdata);

                return "(";
            }
            else if(head === "i"){
                stack.push(F[1][0]); // push i
                // add to chartdata like data
                searchChild("F", [{
                    name: "i",
                }], chartdata);

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


        // console.log("stack: " + stack);
        // console.log("arr: " + arr);
        for (let x = 0; x < arr.length; x++) {
            const element = arr[x];
            head = arr[x];
            
            let temp = '';
            while(element !== temp)
            {
                if(temp !== "wrong") {
                    // console.log("stack: " + stack);
                    // console.log("element: " + element);
                    // console.log("temp: " + temp);
                    temp = pushStack();
                }
                else{
                    // console.log("wrong");
                    break;
                }
            } 
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
                // console.log("befor" + stack);
                stack.pop();
                // console.log("after" + stack);
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
        cha();

    });
  
  });
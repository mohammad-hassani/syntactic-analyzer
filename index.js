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
            // // console.log("pname" + v.name);
            // // console.log("val" + val);
            if (v.name == val) {
                for (let j = 0; j < arr.length; j++) {
                    // // console.log("......................" + arr[j].name);
                        v.children.push(arr[j]);
                }
            }
            // // console.log("=============>" + v.name);
            // // console.log("======v=======>" + v);
            // // console.log("======v.children=======>" + v.children);
            // if (parent[i].children) {
            //     // // console.log('pchild: exist');
            //     if (parent[i].children.length > 0) {
            //         // // console.log('pchild: exist ' + parent[i].children.length);
            //         for (let j = 0; j < parent[i].children.length; j++) {
            //             // // console.log('pchild: exist ' + parent[i].children[j].name);
            //             searchChild(val, arr, parent[i].children[j]);
            //         }
            //     }
            // }
            
        });
        $.each(parent, function(i, v) {
            $.each(v.children, function(j, q) {
                searchChild(val, arr, q);
                // // console.log("===========jq===============>" + q);
            })
        });
    }




    let hed = []
    function tree(parent, child) {
        // console.log(hed);
        // read top of the hed stack
        if(hed.length === 0)
        {
            hed = chartdata
            // console.log(hed);
        }
        let top = hed.pop();
        console.log(top);
        hed.push(top);
        console.log(hed);
        // $.each(top, function(i, v) {
        //     console.log("parent: " + parent);
        //     console.log("name: " + v.name);
        //     console.log(v);
        //     if (v.name == parent) {
        //         $.each(child, function(j, q) {
        //             v.children.push(q);
        //         })
        //         // add child to hed array
        //         hed.push(child);
        //         console.log(hed);
        //     }
        // });
        if (top.name == parent) {
            $.each(child, function(j, q) {
                top.children.push(q);
                hed.push(child[j]);
            })
            // add child to hed array
            
            // console.log(hed);
        }
        if (top.name === "i") {
            hed.pop();
            hed.pop();
            hed.pop();
            hed.pop();
        }
        // if (top.name === "*") {
        //     hed.pop();
        //     hed.pop();
        // }
        if (top.name === "+") {
            hed.pop();
        }
        if (top.name === "@") {
            hed.pop();
            hed.pop();
        }
        chartdata = hed;
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
            tree("E", [{
                name: "X",
                children: []
            },{
                name: "T",
                children: []
            }]);
            // tree("E", ["X","T"]);


            return "T";
        }
        else if(temp === "X"){
            if(head === "+") {
                stack.push(X[0][2]); // push X
                stack.push(X[0][1]); // push T
                stack.push(X[0][0]); // push +
                // add to chartdata like data
                tree("X", [{
                    name: "X",
                    children: []
                },{
                    name: "T",
                    children: []
                },{
                    name: "+",
                }]);
                // xbool = true;
                return "+";
            }
            else{
                // stack.push(X[1][0]); // push null
                // tree("X", [{
                //     name: "X",
                //     children: []
                // },{
                //     name: "T",
                //     children: []
                // },{
                //     name: "+",
                //     children: []
                // }]);
                tree("X", [{
                    name: "@",
                }]);
                return temp;
            }
        }
        else if(temp === "T"){
            stack.push(T[0][1]); // push Y
            stack.push(T[0][0]); // push F
            // find all child with name T and add to it
            tree("T", [{
                name: "Y",
                children: []
            },{
                name: "F",
                children: []
            }]);

            return "F";
        }
        else if(temp === "Y"){
            if(head === "*") {
                stack.push(Y[0][2]); // push Y
                stack.push(Y[0][1]); // push F
                stack.push(Y[0][0]); // push *
                // add to chartdata like data
                tree("Y", [{
                    name: "Y",
                    children: []
                },{
                    name: "F",
                    children: []
                },{
                    name: "*",
                }]);
                // ybool = true;
                return "*";
            }
            else{
                // stack.push(Y[1][0]); // push null
                tree("Y", [{
                    name: "@",
                }]);
                return temp;
            }
        }
        else if(temp === "F"){
            if(head === "("){
                stack.push(F[0][2]); // push )
                stack.push(F[0][1]); // push E
                stack.push(F[0][0]); // push (
                // add to chartdata like data
                tree("F", [{
                    name: "(",
                },{
                    name: "E",
                    children: []
                },{
                    name: ")",
                }]);

                return "(";
            }
            else if(head === "i"){
                stack.push(F[1][0]); // push i
                // add to chartdata like data
                tree("F", [{
                    name: "i",
                }]);

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
        let temp = '';
        for (let x = 0; x < arr.length; x++) {
            const element = arr[x];
            head = arr[x];

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
                p.innerHTML = temp + " = stack is: " + stack;
                document.getElementById("div").appendChild(p);
            }
        }
        // empty stack
        while(stack.length > 0){
            temp = pushStack();
            stack.pop();
        }

    }

    $('#sub').click(function(){
        
        testString()
        // tree()
        cha();

    });
  
  });
 /*
Name: interpret.js
Author: Vidhu Nath
Description: This JS file contains the interpreter used for the Bridge
	language and is called by 'website.html' to process the langauge.

*/

var _ = null;

Leaf = String;
Node = "object";

var eval_term = function(env, e) {
    if (typeof e === Node) {

        //for(var key in e)
        for (var key in e) {

            /*
            if (key == "Number") {
                var n = e[key];
                n = Number(n);
                return n;
            }

            if (key == "Variable") {
                var x = e[key];
                if (env[x] != null) {
                    return eval_expression(env,env[x]);
                } else {
                    alert("Variable not assigned to any value.");
                }
            } */

            if (key == "Plus") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
                return v1 + v2;
            }

            if (key == "Minus") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
                return v1 - v2;
            }

            if (key == "Factor") {
                var e1 = e[key][0];
                return eval_factor(env, e1);
            }
        }
    }

    return null;
};


var eval_factor = function(env,e) {
    if (typeof e === Node) {

        for (var key in e) {

            if (key == "Number") {
                var n = e[key][0];
                n = Number(n);
                return n;
            }

            if (key == "Variable") {
                var e1 = e[key][0];

                var o = eval_expression(env,e1);
                if (o == null) {
                    alert("Variable is not assigned to any value.");
                    return "Error: Variable not defined!";
                } else
                    return o;
            }

            if (key == "Minus") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_factor(env,e1);
                var v2 = eval_factor(env,e2);
                return v1 - v2;
            }

            if (key == "Mult") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_factor(env,e1);
                var v2 = eval_factor(env,e2);
                return v1 * v2;
            }

            if (key == "Div") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_factor(env,e1);
                var v2 = eval_factor(env,e2);
                return v1 / v2;
            }

            if (key == "Mod") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_factor(env,e1);
                var v2 = eval_factor(env,e2);
                return v1 % v2;
            }

            if (key == "Power") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_factor(env,e1);
                var v2 = eval_factor(env,e2);
                return Math.pow(v1, v2);
            } 
        }
    } 

    return null;
};

var eval_formula = function(env,e) {
	if (typeof e === Node) {

        //for(var key in e)
        for (var key in e) {

            if (key == "And") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_formula(env,e1);
                var v2 = eval_formula(env,e2);
                return v1 && v2;
            }

            if (key == "Or") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_formula(env,e1);
                var v2 = eval_formula(env,e2);
                return v1 || v2;
            }

            if (key == "Not") {
                var e1 = e[key][0];
                var v1 = eval_formula(env,e1);
                return !v1;
            }

            if (key == "GT") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
                return v1 > v2;
            }

            if (key == "LT") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
                return v1 < v2;
            }

            if (key == "GTE") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
                return v1 >= v2;
            }

            if (key == "LTE") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
                return v1 <= v2;
            }

            if (key == "Equal") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
                return v1 === v2;
            }

            if (key == "True") {
                return JSON.stringify(key, null, 2);
                //return true;
            }

            if (key == "False") {
                return JSON.stringify(key, null, 2);
                //return false;
            }
        }

    } else {

        if (e == "True") {
            return true;
        }

        if (e == "False") {
            return false;
        }
    }
};


var eval_expression = function(env,e) {
    var outp;

    if (typeof e === Node) {

        for (var key in e) {
            if (key == "Term") {
                var child = e[key][0];
                outp = eval_term(env,child);
            }

            if (key == "Formula") {
                var child = e[key][0]
                outp = eval_formula(env,child);
            }
        }
    }

	return outp;
};


var execute = function(env,e) {
    //console.log(env);

    if (typeof e === Node) {

        for (var key in e) {

            if (key == "Print") {
                var e1 = e[key][0];
                var o = eval_expression(env,e1);
                return o;
            }

            if (key == "Assign") {
                var v = e[key][0];
                var e1 = e[key][1];
                var p = e[key][2];

                console.log(e1);

                env[v] = e1;
                console.log(env);
                var o = execute(env,p);
                return o;
            }
        }
    }
};

/*
var exec_assign = function(env,e) {
    if (typeof e === Node) {

        for (var key in e) {
            if (key == "Assign") {
                var vr = e[key][0];
                var e1 = e[key][1];
                console.log(e1);
                //var p = e[key][2];
                env[vr] = eval_expression(env,e1);
                console.log(env);
                return env[vr];
            }
        }
    }
};

*/

var interpret = function(env, e) {
    var outp = execute(env,e);
    return outp;
};
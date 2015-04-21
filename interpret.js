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
            var child = e[key]

            if (key == "Plus") {
                var e1 = child[0];
                var e2 = child[1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
                return v1 + v2;
            }

            if (key == "Minus") {
                var e1 = child[0];
                var e2 = child[1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
                return v1 - v2;
            }

            if (key == "Factor") {
                var e1 = child[0];
                return eval_factor(env, e1);
            }
        }
    }

    return null;
};


var eval_factor = function(env,e) {
    if (typeof e === Node) {

        for (var key in e) {
            var child = e[key];

            if (key == "Number") {
                var n = child[0];
                n = Number(n);
                return n;
            }

            if (key == "Variable") {
                var x = child[0];

                if (env[x] == null) {
                    alert("Variable " + x + " is not defined!")
                } else {
                    return env[x];
                }
            }

            if (key == "Minus") {
                var e1 = child[0];
                var e2 = child[1];
                var v1 = eval_factor(env,e1);
                var v2 = eval_factor(env,e2);
                return v1 - v2;
            }

            if (key == "Mult") {
                var e1 = child[0];
                var e2 = child[1];
                var v1 = eval_factor(env,e1);
                var v2 = eval_factor(env,e2);
                return v1 * v2;
            }

            if (key == "Div") {
                var e1 = child[0];
                var e2 = child[1];
                var v1 = eval_factor(env,e1);
                var v2 = eval_factor(env,e2);
                return v1 / v2;
            }

            if (key == "Mod") {
                var e1 = child[0];
                var e2 = child[1];
                var v1 = eval_factor(env,e1);
                var v2 = eval_factor(env,e2);
                return v1 % v2;
            }

            if (key == "Power") {
                var e1 = child[0];
                var e2 = child[1];
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
            var child = e[key];

            if (key == "And") {
                var e1 = child[0];
                var e2 = child[1];
                var v1 = eval_formula(env,e1);
                var v2 = eval_formula(env,e2);
                return v1 && v2;
            }

            if (key == "Or") {
                var e1 = child[0];
                var e2 = child[1];
                var v1 = eval_formula(env,e1);
                var v2 = eval_formula(env,e2);
                return v1 || v2;
            }

            if (key == "Not") {
                var e1 = child[0];
                var v1 = eval_formula(env,e1);
                return !v1;
            }

            if (key == "GT") {
                var e1 = child[0];
                var e2 = child[1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
                return v1 > v2;
            }

            if (key == "LT") {
                var e1 = child[0];
                var e2 = child[1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
                return v1 < v2;
            }

            if (key == "GTE") {
                var e1 = child[0];
                var e2 = child[1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
                return v1 >= v2;
            }

            if (key == "LTE") {
                var e1 = child[0];
                var e2 = child[1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
                return v1 <= v2;
            }

            if (key == "Equal") {
                var e1 = child[0];
                var e2 = child[1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
                return v1 === v2;
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
            var child = e[key];

            if (key == "Print") {
                var e1 = child[0];
                var o = eval_expression(env,e1);
                return o;
            }

            if (key == "Assign") {
                var v = child[0];
                var e1 = child[1];
                var p = child[2];

                var res = eval_expression(env, e1);

                env[v] = res;
                var o = execute(env,p);
                return o;
            }

            if (key == "If") {
                var f = child[0];
                var p1 = child[1];
                var p2 = child[2];

                var outp1;
                var outp2 = execute(env,p2);

                var res = eval_formula(env, f);
                if (res == true) {
                    outp1 = execute(env,p1);
                    return [outp1,outp2];
                }
                else
                    return outp2;
            }

            if (key == "For") {
                var t1 = child[0];
                var p1 = child[1];
                var p2 = child[2];

                t1 = eval_term(env, t1);
                t1 = Math.abs(t1);

                var outp1 = [];
                for (var i = 0; i < t1; i++) {
                    var tmp1 = execute(env,p1);
                    outp1 = outp1.concat(tmp1);
                }

                var outp2 = execute(env, p2);
                return [outp1,outp2];
            }
        }
    }
};

var interpret = function(env, e) {
    var outp = execute(env,e);
    return outp;
};
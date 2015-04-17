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

            if (key == "Number") {
                var n = e[key];
                n = Number(n);
                return n;
            }

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

            if (key == "Mult") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
                return v1 * v2;
            }

            if (key == "Div") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
                return v1 / v2;
            }

            if (key == "Mod") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
                return v1 % v2;
            }

            if (key == "Power") {
                var e1 = e[key][0];
                var e2 = e[key][1];
                var v1 = eval_term(env,e1);
                var v2 = eval_term(env,e2);
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
        }
    }

    if (typeof e === Leaf) {
    	if (e == "True") {
    		return true;
    	}

    	if (e == "False") {
    		return false;
    	}
    }
};

var evaluate = function(env,e) {
	var outp = eval_term(env,e);

	if (outp == null) {
		outp = eval_formula(env,e);
	}

	return outp;
};

	/*if (typeof e === Leaf) {
		for (var key in e) {

			if (key == "True")
				return true;
			else
				return false;
		}
	}
}


*/

/*

Name: interpret.js
Author: Vidhu Nath
Description: This JS file contains the interpreter for the Bridge
	language and calls upon uxadt.js to operate.



// THINGS TO DO STILL::
//
// include imports of uxadt.js
// no direct import allowed in js, might need to include
// via jquery or through html

// Array prototype extension to use contains function
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

//var uxadt = require("./uxadt.js");

// set the initial type
var _ = null;

// container for the langauge
uxadt._({
	Number: [],
	Variable: [],
	PLus: [_,_],
	Minus: [_,_],
	Mult: [_,_],
	Div: [_,_],
	Power: [_,_],
	Mod: [_,_],
	True: [],
	False: [],
	And: [_,_],
	Or: [_,_],
	Not: [_],
	GT: [_,_],
	LT: [_,_],
	GTE: [_,_],
	LTE: [_,_],
	Eq: [_,_],
});

// evaluate the terminals and non-terminals in term
function eval_term(env,e) {
	if (e._(Number(_))) {
		var n = e.match();
		return n;
	}

	if (e._(Variable(_))) {
		var n = e.match();

		if (env.contains(n)) {
			return eval_term(env, env[n]);
		} else {
			alert("Error: Variable is unbounded.");
		}

	}

	if (e._(Plus(_,_))) {
		var es = e.match();
		return eval_term(env, es[0]) + eval_term(env,es[1]);
	}

	if (e._(Minus(_,_))) {
		var es = e.match();
		return eval_term(env, es[0]) - eval_term(env,es[1]);
	}

	if (e._(Mult(_,_))) {
		var es = e.match();
		return eval_term(env, es[0]) * eval_term(env,es[1]);
	}

	if (e._(Div(_,_))) {
		var es = e.match();
		return eval_term(env, es[0]) / eval_term(env,es[1]);
	}

	if (e._(Power(_,_))) {
		var es = e.match();
		return Math.pow(eval_term(env,es[0]), eval_term(env,es[1]));
	}

	if (e._(Mod(_,_))) {
		var es = e.match();
		return eval_term(env, es[0]) % eval_term(env,es[1]);
	}
};
/*
// evaluate the terminals and non-terminals in formula
function eval_formula(env,e) {
	if (e._(True(_))) {
		[n] = e.match();
		return n;
	}

	if (e._(False(_))) {
		[n] = e.match();
		return n;
	}

	if (e._(And(_,_))) {
		[e1, e2] = e.match();
		return eval_formula(env,e1) && eval_formula(env,e2);
	}

	if (e._(Or(_,_))) {
		[e1, e2] = e.match();
		return eval_formula(env,e1) || eval_formula(env,e2);
	}

	if (e._(Not(_))) {
		[e1] = e.match();
		return !eval_formula(env,e1);
	}

	if (e._(GT(_,_))) {
		[e1, e2] = e.match();
		return eval_formula(env,e1) > eval_formula(env,e2);
	}

	if (e._(LT(_,_))) {
		[e1, e2] = e.match();
		return eval_formula(env,e1) < eval_formula(env,e2);
	}

	if (e._(GTE(_,_))) {
		[e1, e2] = e.match();
		return eval_formula(env,e1) >= eval_formula(env,e2);
	}

	if (e._(LTE(_,_))) {
		[e1, e2] = e.match();
		return eval_formula(env,e1) <= eval_term(env,e2);
	}

	// not sure if need "==" or "==="
	// used "===" by default for comprehensiveness
	if (e._(Equal(_,_))) {
		[e1, e2] = e.match();
		return eval_formula(env,e1) === eval_formula(env,e2);
	}
};

function eval_exp(env,e) {
	if (e._(Term()))
}
*/
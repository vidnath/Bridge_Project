/*

Name: interpret.js
Author: Vidhu Nath
Description: This JS file contains the interpreter for the Bridge
	language and calls upon uxadt.js to operate.

*/

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

var uxadt = require("./uxadt.js");

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
	if (e._(Number(_)) == True) {
		[n] = e.matched();
		return n;
	}

	if (e._(Variable(_))) {
		[n] = e.matched();

		if env.contains(n) {
			return eval_term(env, env[n]);
		} else {
			alert("Error: Variable is unbounded.");
		}

	}

	if (e._(Plus(_,_))) {
		[e1, e2] = e.matched();
		return eval_term(env, e1) + eval_term(env,e2);
	}

	if (e._(Minus(_,_))) {
		[e1, e2] = e.matched();
		return eval_term(env,e1) - eval_term(env,e2);
	}

	if (e._(Mult(_,_))) {
		[e1, e2] = e.matched();
		return eval_term(env,e1) * eval_term(env,e2);
	}

	if (e._(Div(_,_))) {
		[e1, e2] = e.matched();
		return eval_term(env,e1) / eval_term(env,e2);
	}

	if (e._(Power(_,_))) {
		[e1, e2] = e.matched();
		return Math.pow(eval_term(env,e1), eval_term(env,e2));
	}

	if (e._(Mod(_,_))) {
		[e1, e2] = e.matched();
		return eval_term(env,e1) % eval_term(env,e2);
	}
};

// evaluate the terminals and non-terminals in formula
function eval_formula(env,e) {
	if (e._(True(_))) {
		[n] = e.matched();
		return n;
	}

	if (e._(False(_))) {
		[n] = e.matched();
		return n;
	}

	if (e._(And(_,_))) {
		[e1, e2] = e.matched();
		return eval_formula(env,e1) && eval_formula(env,e2);
	}

	if (e._(Or(_,_))) {
		[e1, e2] = e.matched();
		return eval_formula(env,e1) || eval_formula(env,e2);
	}

	if (e._(Not(_))) {
		[e1] = e.matched();
		return !eval_formula(env,e1);
	}

	if (e._(GT(_,_))) {
		[e1, e2] = e.matched();
		return eval_formula(env,e1) > eval_formula(env,e2);
	}

	if (e._(LT(_,_))) {
		[e1, e2] = e.matched();
		return eval_formula(env,e1) < eval_formula(env,e2);
	}

	if (e._(GTE(_,_))) {
		[e1, e2] = e.matched();
		return eval_formula(env,e1) >= eval_formula(env,e2);
	}

	if (e._(LTE(_,_))) {
		[e1, e2] = e.matched();
		return eval_formula(env,e1) <= eval_term(env,e2);
	}

	// not sure if need "==" or "==="
	// used "===" by default for comprehensiveness
	if (e._(Equal(_,_))) {
		[e1, e2] = e.matched();
		return eval_formula(env,e1) === eval_formula(env,e2);
	}
};

function eval_exp(env,e) {
	if (e._(Term()))
}


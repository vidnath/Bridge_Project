// include imports of uxadt.js
// no direct import allowed in js, might need to include
// via jquery or through html

var _ = null;

// interpret for term
uxadt._({
	Number: [],
	Variable: [],
	PLus: [_,_],
	Minus: [_,_],
	Mult: [_,_],
	Div: [_,_],
	Power: [_,_],
	Mod: [_,_],
});

function evaluate(e) {
	if (e._(Number(_))) {
		[n] = e.matched();
		return n;
	}

	if (e._(Plus(_,_))) {
		[e1, e2] = e.matched();
		return evaluate(e1) + evaluate(e2)
	}

	if (e._(Minus(_,_))) {
		[e1, e2] = e.matched();
		return evaluate(e1) - evaluate(e2)
	}

	if (e._(Mult(_,_))) {
		[e1, e2] = e.matched();
		return evaluate(e1) * evaluate(e2)
	}

	if (e._(Div(_,_))) {
		[e1, e2] = e.matched();
		return evaluate(e1) / evaluate(e2)
	}

	if (e._(Power(_,_))) {
		[e1, e2] = e.matched();
		return evaluate(e1) ** evaluate(e2)
	}

	if (e._(Mod(_,_))) {
		[e1, e2] = e.matched();
		return evaluate(e1) % evaluate(e2)
	}

}
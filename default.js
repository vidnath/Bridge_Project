/*
var I = imparse;

var grammar =
  I.Grammar([
    // Program production
    
    I.Production('Program', [
        I.Choices([
            I.Choice('Number', I.AssocNone(), [
                I.RegExpr('(0|[1-9][0-9]*)')
            ]),
            I.Choice('Variable', I.AssocNone(), [
                I.RegExpr('[a-z][A-Za-z]*')
            ]),
            I.Choice('Display', I.AssocNone(), [
                I.Terminal('display'), I.Nonterminal('Expression')
            ]),
            I.Choice('For', I.AssocNone(), [
                I.Terminal('for'), I.Nonterminal('Expression'),
                I.Terminal('to'), I.Nonterminal('Term'),
                I.Nonterminal('Program'), I.Nonterminal('Program')
            ]),
            I.Choice('If', I.AssocNone(), [
                I.Nonterminal('if'), I.Nonterminal('Formula'),
                I.Nonterminal('Program'), I.Nonterminal('Program')
            ]),
            I.Choice('While', I.AssocNone(), [
                I.Nonterminal('while'), I.Nonterminal('Formula'),
                I.Nonterminal('Program'), I.Nonterminal('Program')
            ]),

            // unsure how to approach the assign operator
        ]),
    ]),

    // Formula production
    I.Production('Formula', [

      // logical operators
      I.Choices([
        I.Choice('And', I.AssocNone(), [
          I.Nonterminal('Formula'), I.Terminal('and'), I.Nonterminal('Formula')
        ]),
        I.Choice('Or', I.AssocNone(), [
          I.Nonterminal('Formula'), I.Terminal('or'), I.Nonterminal('Formula')
        ]),
        I.Choice('Not', I.AssocNone(), [
          I.Terminal('not'), I.Nonterminal('Formula')
        ]),
        I.Choice('True', I.AssocNone(), [
          I.Terminal('True')
        ]),
        I.Choice('False', I.AssocNone(), [
          I.Terminal('False')
        ]),

        // comparable operators
        I.Choice('Equal', I.AssocNone(), [
          I.Nonterminal('Number'), I.Terminal('=='), I.Nonterminal('Number')
        ]),
        I.Choice('Greater Than', I.AssocNone(), [
            I.Nonterminal('Term'), I.Terminal('>'), I.Nonterminal('Term')
        ]),
        I.Choice('Less Than', I.AssocNone(), [
            I.Nonterminal('Term'), I.Terminal('<'), I.Nonterminal('Term')
        ]),
        I.Choice('Greater Than Equals', I.AssocNone(), [
            I.Nonterminal('Term'), I.Terminal('>='), I.Nonterminal('Term')
        ]),
        I.Choice('Less Than Equals', I.AssocNone(), [
            I.Nonterminal('Term'), I.Terminal('<='), I.Nonterminal('Term')
        ]),
      ]),
    ]),

    // Term Production
    I.Production('Term', [
        I.Choices([
            I.Choice('Number', I.AssocNone(), [
                I.RegExpr('(0|[1-9][0-9]*)')
            ]),
            I.Choice('Variable', I.AssocNone(), [
                I.RegExpr('[a-z][A-Za-z]*')
            ]),
            I.Choice('Plus', I.AssocNone(), [
                I.Nonterminal('Term'), I.Terminal('+'), I.Nonterminal('Term')
            ]),
            I.Choice('Minus', I.AssocNone(), [
                I.Nonterminal('Term'), I.Terminal('-'), I.Nonterminal('Term')
            ]),
            I.Choice('Mult', I.AssocNone(), [
                I.Nonterminal('Term'), I.Terminal('*'), I.Nonterminal('Term')
            ]),
            I.Choice('Divide', I.AssocNone(), [
                I.Nonterminal('Term'), I.Terminal('/'), I.Nonterminal('Term')
            ]),
            I.Choice('Power', I.AssocNone(), [
                I.Nonterminal('Term'), I.Terminal('**'), I.Nonterminal('Term')
            ]),
            I.Choice('Mod', I.AssocNone(), [
                I.Nonterminal('Term'), I.Terminal('%'), I.Nonterminal('Term')
            ]),
        ]),
    ]),
  ]);

var procBNF = function () {
    var str = document.getElementById('bnf_input').value;
    var ux = I.bnfToUxadt(str);
    grammar = ux;
    document.getElementById('bnf_output1').innerHTML = I.printUxadtGrammar(ux);
};

var procParse = function () {
    var str = document.getElementById('parser_input').value;
    var tree = I.parser(grammar, str);
    if (typeof tree == "string") {
        document.getElementById('parser_output').innerHTML = tree;
    } else {
        document.getElementById('parser_output').innerHTML = JSON.stringify(tree, null, 2);
    }
};

*/



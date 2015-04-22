var I = imparse;
        var grammar =
          I.Grammar([
            I.Production('Formula', [
              I.Choices([
                I.Choice('And', I.AssocNone(), [
                  I.Nonterminal('Formula'), I.Terminal('and'), I.Nonterminal('Formula')
                ]),
                I.Choice('Or', I.AssocNone(), [
                  I.Nonterminal('Formula'), I.Terminal('or'), I.Nonterminal('Formula')
                ]),
                I.Choice('Equal', I.AssocNone(), [
                  I.Nonterminal('Number'), I.Terminal('=='), I.Nonterminal('Number')
                ]),
                I.Choice('Not', I.AssocNone(), [
                  I.Terminal('not'), I.Nonterminal('Formula')
                ]),
                I.Choice('True', I.AssocNone(), [
                  I.Terminal('true')
                ]),
                I.Choice('False', I.AssocNone(), [
                  I.Terminal('false')
                ]),
              ]),
            ]),
            I.Production('Number', [
              I.Choices([
                I.Choice('Plus', I.AssocNone(), [
                  I.Nonterminal('Number'), I.Terminal('+'), I.Nonterminal('Number')
                ]),
                I.Choice('Minus', I.AssocNone(), [
                  I.Nonterminal('Number'), I.Terminal('-'), I.Nonterminal('Number')
                ]),
                I.Choice('Number', I.AssocNone(), [
                  I.RegExpr('(0|[1-9][0-9]*)')
                ]),
                I.Choice('Mult', I.AssocNone(), [
                    I.Nonterminal('Number'), I.Terminal('*'), I.Nonterminal('Number')
                ]),
                I.Choice('Divide', I.AssocNone(), [
                    I.Nonterminal('Number'), I.Terminal('/'), I.Nonterminal('Number')
                ]),
              ]),
            ]),
          ]);
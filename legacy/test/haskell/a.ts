import {A, Eff} from '../../../dist/haskell/Data/Monoid/readme'

class B {b=1}
Eff(A).mempty().a.append(Eff(A).mempty().a)
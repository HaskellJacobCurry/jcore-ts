import {HKT, URI1, URI2, Kind1, Kind2} from '../../Common/HKT'
import {Applicative} from '../Control/Applicative'
import {Monoid} from './Monoid'
import {
	Json,
	define
} from '../../Common'

interface IPopulatable_<F> {}
interface Populatable_<F> extends Applicative<F>, Monoid<HKT<F, any>> {}
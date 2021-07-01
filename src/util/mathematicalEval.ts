import { evaluate } from 'mathjs'
export default function mathematicalEval(ex: string): number {
	return evaluate(ex)
}

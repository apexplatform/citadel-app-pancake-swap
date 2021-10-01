import {Dec, Int } from '@keplr-wallet/unit';
const twoInt = new Int(2);
const oneDec = new Dec(1);

export function pow(base, exp){
	if (!base.isPositive()) {
		throw new Error('base must be greater than 0');
	}
	if (base.gte(new Dec('2'))) {
		throw new Error('base must be lesser than two');
	}
	const integer = exp.truncate();
	const fractional = exp.sub(new Dec(integer));

	const integerPow = powInt(base, integer);

	if (fractional.isZero()) {
		return integerPow;
	}
	const fractionalPow = powApprox(base, fractional, powPrecision);
	return integerPow.mul(fractionalPow);
}

function powInt(base, power) {
    const zeroInt = new Int(0);
	if (power.equals(zeroInt)) {
		return oneDec;
	}
	let tmp = oneDec;
	for (let i = power; i.gt(new Int(1)); ) {
		if (!i.mod(twoInt).equals(zeroInt)) {
			tmp = tmp.mul(base);
		}
		i = i.div(twoInt);
		base = base.mul(base);
	}

	return base.mul(tmp);
}
export function calcOutGivenIn(tokenBalanceIn,tokenWeightIn,tokenBalanceOut,tokenWeightOut,tokenAmountIn,swapFee){
    const oneDec = new Dec('1');
	const weightRatio = tokenWeightIn.quo(tokenWeightOut);
	let adjustedIn = oneDec.sub(swapFee);
	adjustedIn = tokenAmountIn.mul(adjustedIn);
	const y = tokenBalanceIn.quo(tokenBalanceIn.add(adjustedIn));
	const foo = pow(y, weightRatio);
	const bar = oneDec.sub(foo);
	return tokenBalanceOut.mul(bar);
}

export function calcSpotPrice(tokenBalanceIn, tokenWeightIn, tokenBalanceOut, tokenWeightOut, swapFee){
	const number = tokenBalanceIn.quo(tokenWeightIn);
	const denom = tokenBalanceOut.quo(tokenWeightOut);
	const scale = oneDec.quo(oneDec.sub(swapFee));
	return number.quo(denom).mul(scale);
}
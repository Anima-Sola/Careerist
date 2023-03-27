//ZX basic RND function
const RND = () => {
    let seed = 15619;

    return function() {
        seed = ( seed + 1 ) * 75;
        seed = seed - Math.floor( seed / 65537 ) * 65537;
        seed = seed - 1; 
        return seed / 65536;
    }
}

const rnd = RND();

export const rndBetweenMinusOneAndOne = () => {
    return -1 + 2 * rnd();
}

const random = () => {
    return 0.01 * Math.floor( 5 + 47.5 * ( 1 + rndBetweenMinusOneAndOne() ));
}

export default random;
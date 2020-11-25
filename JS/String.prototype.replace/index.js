const string = 'aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzz';

const regex = /(a+)\w+?(e+)\w+?(i+)\w+?(o+)(?:\w+?)(u+)\w+/;

const restring = '**$1**$2**$3**$4**$5';

const res1 = string.replace(regex, restring);
const res2 = String.prototype.replace.call(string, regex, restring);
const res3 = String.prototype.replace.apply(string, [regex, restring]);
const res4 = String.prototype.replace.bind(string, regex, restring)();

const res5 = string.replace(regex, (match, $1, $2, $3, $4, $5, offset, origin, obj) => {
    return `**${$1}**${$2}**${$3}**${$4}**${$5}`
})

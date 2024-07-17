const str = "CODE";
const lowercase = str.toLowerCase();
console.log(typeof lowercase);

const str2 = "Hello, world!";
const split = str2.split(", ");
if (Array.isArray(split)) {
    console.log("split is an array");
}

const replace = str2.replace("world", "everyone");
console.log(replace);

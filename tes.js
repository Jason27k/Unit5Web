var reverseVowels = function (s) {
    const splitStr = s.split("");
    let left = 0;
    let right = splitStr.length - 1;
    const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
  
    while (left < right) {
      if (vowels.has(splitStr[left]) && vowels.has(splitStr[right])) {
        [splitStr[left], splitStr[right]] = [splitStr[right], splitStr[left]];
        left++;
        right--;
      } else if (!vowels.has(splitStr[left])) {
        left++;
      } else if (!vowels.has(splitStr[right])) {
        right--;
      }
    }
  
    return splitStr.join("");
  };
  
  
  
  

  // Example 1:
const s1 = "hello";
const output1 = reverseVowels(s1);
console.log(output1); // "holle"

// Example 2:
const s2 = "leetcode";
const output2 = reverseVowels(s2);
console.log(output2); // "leotcede"

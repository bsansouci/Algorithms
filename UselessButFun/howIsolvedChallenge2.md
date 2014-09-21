Hello David,

here is some notes on how I solved challenge 2. I started with the script that I wrote for the previous challenge but soon realized that I wouldn't be able to make a dictionary in a reasonable amount of time. I started playing around and trying to find rules. I was able to find a set of rules, but nothing that really made it clear how the encryption worked (things like: if there's an "a", mapped to YQ and I add another "a" it changes the Q by an increment of 6 to W, and that almost worked for everything except sometimes it would be an increment of 7, or things like the second letter of the encrypted version follows a pattern of A->Q->g->w and then loops back to A, which are increments of 16, and then the if you add another letter behind the one that you're encrypting, the interval between the third letters is of 4, and is of 2 for the 4th letter). So I made a small function that would try every possible ascii and take the first letter of the result, use it as a key in my dictionary. Since I knew I needed a T, I checked which letter gave a T: L, N, M or O. Then I tried each one of those and found that N was the right one because I needed an "n" behind. I did that for a while and found the first two words "Not everything". Since the first challenge was a quote, I googled "quote not everything" and found "Not everything that can be counted counts, and not everything that counts can be counted" which was the answer. It's not really a nice way to do it, but it worked.

I'm pretty sure I could solve this using backtracking. Basically we would build a tree of possiblities and perform depth first search on it. This tree of possibilities isn't the brute force tree with all the possibilities, only the one with restricted possibilities depending on the encryptedString that we're trying to decrypt. So for example if the first letter is a T, we can remove all the possibility (ascci possibility) that, once encrypted, don't start with a T.

Some pseudo code for it would be the following:
input:
    encryptedString // the string we're trying to decrypt
    curword // the word we've built up so far
    i // the letter at which we are currently (corresponding to the depth of the implicit tree that we're building)

try curword + (all ascii one by one) and build a dictionary out of that
set possibleMatches = dictionary[ith letter of encryptedString + (i + 1)th letter of encryptedString]
if i mod 3 is 0 then increment i // this is because after 3 letters in the input, we need to skip a letter in the output (encrypted string) because i + 1 is a fourth letter in the ouput that won't change even if we add a fourth letter in the input

loop j from 0 to possibleMatches.length:
    recursively call this function with parameters
        encryptedString = encryptedString 
        curword = curword + possibleMatches[j] 
        i = i + 1
    if this recursive call returns null, continue
    else we found our answer, return answer
return null

Sorry if it's not super clear, you can ask me any questions you want.

Best Regards,

Ben
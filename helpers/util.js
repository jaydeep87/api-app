module.exports = {
    removeENUKeys: (o) => {
        Object.keys(o).forEach(k => (o[k] === undefined || o[k] === null || o[k] === '') && delete o[k]);
        return o;
    },

    getDuplicateData: (data) => {
        return data.filter((item, index, self) => {
            item.errorMessage = 'Duplicate record, line No. : ' + (index + 2);
            return index !== self.findIndex((e) => (
                e.cmatId === item.cmatId && e.domainName === item.domainName && e.partyType === item.partyType
            ))
        });
    },

    getUniqueData: (data) => {
        return data.filter((item, index, self) =>
            index === self.findIndex((e) => (
                e.cmatId === item.cmatId && e.domainName === item.domainName && e.partyType === item.partyType
            )));
    },
    strToJSON: (str, fileKeyObj) => {
        let responseData = {
            resultData: [],
            validHeaders: [],
            inValidHeaders: []
        };
        if (str) {
            let numberOfLineBreaks = (str.match(/\n/g) || []).length;
            console.log(numberOfLineBreaks);
            // let arr = str.split('\r\n');
            let arr = str.split(/\r\n/g);
            let keyArr = [];
            let keyHeader = arr[0].split('|');
            keyHeader.forEach(k => {
                if (fileKeyObj[k.trim().toLowerCase()]) {
                    responseData.validHeaders.push(k.trim().toLowerCase());
                } else {
                    responseData.inValidHeaders.push(k.trim());
                }
            });
            if (responseData.inValidHeaders.length) {
                return responseData;
            } else {
                arr.forEach((e, i) => {
                    if (e.length) {
                        let tempArr = e.split('|');
                        if (i === 0) {
                            keyArr = tempArr
                        } else {
                            let tempObj = {};
                            keyArr.forEach((v, j) => {
                                let k = v.toLowerCase();
                                if (fileKeyObj[k]) {
                                    tempObj[fileKeyObj[k]] = tempArr[j];
                                } else {
                                    tempObj[v] = tempArr[j];
                                }
                            })
                            responseData.resultData.push(tempObj);
                        }
                    }
                });
                return responseData;
            }
        }
    },

    capitalize: (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    },
    getInitials: name => name
        .replace(/[^A-Za-z0-9 ]/ig, '')        // taking care of numbers as well
        .replace(/ +/ig, ' ')                     // replace multiple spaces to one
        .split(/ /)                               // break the name into parts
        .reduce((acc, item) => acc + item[0], '') // assemble an abbreviation from the parts
        .concat(name.substr(1))                   // what if the name consist only one part
        .concat(name)                             // what if the name is only one character
        .substr(0, 3)                             // get the first two characters an initials
        .toUpperCase()
    ,
    get3CharInitials: name => {
        if (name.trim().length >= 3) {
            //splits words to array
            let nameArray = name.trim().replace(/ +/ig, ' ').split(" ");

            let initials = '';

            //if it's a single word, return 1st and 2nd character
            if (nameArray.length === 1) {
                let singleWord = (nameArray[0].charAt(0) + "" + nameArray[0].charAt(1) + "" + nameArray[0].charAt(2)).toUpperCase();
                return [
                    singleWord,
                    singleWord + 1,
                    singleWord + 2,
                    singleWord + 3
                ];
            } else {
                initials = nameArray[0].charAt(0);
            }
            //else it's more than one, concat the initials in a loop
            //we've gotten the first word, get the initial of the last word


            //first word
            let nameArrLen = nameArray.length;
            let possibleInitials = [];
            let possibleDupInitials = [];
            let start2Char = "";
            let lastNameParts = ""
            for (let i = (nameArrLen - 2); i < nameArrLen; i++) {
                initials += nameArray[i].charAt(0);
                if (initials.length == 2) {
                    // console.log(initials)
                    start2Char = initials;
                }
                for (let k = 1; k < nameArrLen; k++) {
                    lastNameParts += nameArray[k];
                }
                if (i == nameArrLen - 1) {
                    possibleInitials.push(initials.toUpperCase());
                    possibleDupInitials.push(initials.toUpperCase() + 1);
                    possibleDupInitials.push(initials.toUpperCase() + 2);
                    possibleDupInitials.push(initials.toUpperCase() + 3);
                    for (let j = 1; j < lastNameParts.length; j++) {
                        let tempInitial = (start2Char + lastNameParts.charAt(j)).toUpperCase();
                        // console.log(tempInitial)
                        possibleInitials.push(tempInitial);
                        possibleDupInitials.push(tempInitial + 1);
                        possibleDupInitials.push(tempInitial + 2);
                        possibleDupInitials.push(tempInitial + 3);
                    }
                }

            }

            //return initials after removeing duplicates
            return [...new Set([...possibleInitials, ...possibleDupInitials])];
        } else {
            return [];
        }
    }

}
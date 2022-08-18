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
    }
}
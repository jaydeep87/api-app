const { Transform } = require('stream');
var excel = require('excel-stream');
const fs = require('fs');

module.exports = {
    processExcelFile: filePath => {
        try {
            return new Promise((resolve, reject) => {
                try {
                    fs.createReadStream(filePath)
                        .pipe(excel())
                        .on('data', (row) => {
                            // if (row.unique_code != null && row.unique_code == uniqueCode && row.investor_email_id == emailId) {
                            //     fetchData.push(row);
                            //     console.log(row);
                            // }
                            console.log(row.name);
                        })
                        .on('end', () => {
                            console.log('CSV file successfully processed');
                            // console.log(fetchData);
                            resolve('file upload success!');
                        })
                        .on('error', reject);
                } catch (err) {
                    console.log(err);
                }
            })
        } catch (err) {
            console.log(err);
        }
    },
    getTransformObject : function() {
        const jsonToDb = new Transform({
            writableObjectMode: true,
            readableObjectMode: true,
            transform(chunk, encoding, callback) {
                // to check current memory usage
                // const used = process.memoryUsage().heapUsed / 1024 / 1024;
                // console.log('\033c');
                // console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
                // records is blank array decalred below 
                this.records.push(chunk);
                console.log(chunk['name']);
                counter++
                
                // batch processing of records
                if (this.records.length == 10) {
                    console.log("counter :: ", counter);
                    saveDataToDB(this.records)
                        .then((data) => {
                            // data is modified data
                            // data.forEach((record) => {
                            //     this.push([...Object.values(record)])
                            // })
                            // reset records for batch processing
                            this.records = [];
                            callback();
                        })
                }
                else {
                    callback();
                }
            },
            flush(done) {
                // flush we repeat steps for last records,
                // eg total records 108, last 8 records are left to process
                if (this.records.length > 0) {
                    saveDataToDB(this.records)
                        .then((data) => {
                            // data.forEach((record) => {
                            //     this.push([...Object.values(record)])
                            // })
                            this.records = [];
                            console.log('done processing')
                            done();
                        })
                } else {
                    console.log('done processing')
                    done();
                }
            }
        });
        jsonToDb.records = [];
        return jsonToDb;
    },
    
    // async function to process data
    saveDataToDB : function saveDataToDB(array) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // here data can be modified 
                resolve(array.map(e => ({ ...e, id: Math.floor((Math.random() * 10) + 1) })))
            }, 2)
        })
    }
}
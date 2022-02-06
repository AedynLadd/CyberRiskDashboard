module.exports = {
    string: val => val ? val : "",
    array: val => val ? val : [],
    boolean: val => val ? val : false
}
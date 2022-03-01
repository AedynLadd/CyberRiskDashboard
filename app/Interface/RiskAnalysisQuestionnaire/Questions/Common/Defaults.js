module.exports = {
    string: val => val ? val : "",
    array: val => val ? val : [],
    boolean: val => val ? val : false,
    dict: val => val ? val : {},
    DEFAULT_LIKELIHOOD: "UNLIKELY",
    DEFAULT_IMPACT: "LOW",
    DEFAULT_POA: false
}
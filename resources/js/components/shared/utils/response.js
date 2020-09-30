export const is404 = function(err) {
    return err.response && err.response.status && 404 == err.response.status
}

export const is422 = function(err) {
    return err.response && err.response.status && 422 == err.response.status
}
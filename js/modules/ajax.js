async function readData (settings) {
    let result = null;
    await $.ajax(settings).done(function (response) {
        result = response; // TODO: Do something with the result
    });
    return result;
}

async function CUDCalls (settings) {
    let result = null;
    await $.ajax(settings).done(function (response) {
        result = response; // TODO: Do something with the result
    });
    return result;
}

export {
    readData,
    CUDCalls
}
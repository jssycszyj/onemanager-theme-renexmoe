function sha1loginpass(f) {
    if (f.password1.value == "") return false;
    try {
        timestamp = new Date().getTime() + "";
        timestamp = timestamp.substr(0, timestamp.length - 3);
        f.timestamp.value = timestamp;
        f.password1.value = sha1(timestamp + "" + f.password1.value);
        return true;
    } catch {
        alert("sha1.js not loaded.");
        return false;
    }
}
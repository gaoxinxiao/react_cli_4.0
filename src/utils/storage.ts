let STORE_PREFIX = ''
export const session =  {
    set(key:string, value) {
        if (!key) return false
        window.sessionStorage.setItem(STORE_PREFIX + key, JSON.stringify(value || null))
    },
    get(key:string) {
        if (!key) return null
        return JSON.parse(window.sessionStorage.getItem(STORE_PREFIX + key))
    },
    remove(key:string) {
        window.sessionStorage.removeItem(STORE_PREFIX + key)
    },
    removeAll() {
        window.sessionStorage.clear()
    }
}
export const local = {
    getUsedSize() {
        return unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
    },
    getFreeSize() { //5M
        return 1024 * 1024 * 5 - this.getUsedSize();
    },
    set(key, value, ms = 1000 * 3600 * 24 * 365) {
        if (!key) return false

        key = STORE_PREFIX + key
        let newValue = {
            value: value,
            expires: ms,
            time: new Date().getTime()
        }
        window.localStorage.setItem(key, JSON.stringify(newValue))
    },
    get(key) {
        if (!key) return null
        key = STORE_PREFIX + key

        let value = JSON.parse(window.localStorage.getItem(key))
        if (value && (new Date().getTime() - value.time < value.expires)) {
            value = value.value
        } else {
            value = null
        }
        return value
    },
    remove(key) {
        window.localStorage.removeItem(STORE_PREFIX + key)
    },
    removeAll() {
        window.localStorage.clear()
    }
}

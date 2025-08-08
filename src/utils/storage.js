function createStorage(storage) {
  const isAvailable = storage != null

  function set(key, value) {
    if (!isAvailable || key == null || value == null) return
    storage.setItem(key, value)
  }

  function get(key) {
    if (!isAvailable || key == null) return null
    return storage.getItem(key)
  }

  function setJSON(key, value) {
    if (value != null) {
      set(key, JSON.stringify(value))
    }
  }

  function getJSON(key) {
    const value = get(key)
    return value != null ? JSON.parse(value) : undefined
  }

  function remove(key) {
    if (isAvailable) {
      storage.removeItem(key)
    }
  }

  function clear() {
    if (isAvailable) {
      storage.clear()
    }
  }

  return { set, get, setJSON, getJSON, remove, clear }
}

export const session = createStorage(typeof sessionStorage !== 'undefined' ? sessionStorage : null)
export const local = createStorage(typeof localStorage !== 'undefined' ? localStorage : null)

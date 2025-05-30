export default class IndexDB {
  private readonly IDB: Promise<IDBOpenDBRequest>
  private static instance: IndexDB
  private static tableName1 = 'todos'
  private static tableName2 = 'status'

  private constructor(dbName: string, version = 1) {
    const { promise, resolve, reject } = Promise.withResolvers<IDBOpenDBRequest>()
    try {
      const connect = window.indexedDB.open(dbName, version)
      connect.onerror = function (_e) {
        reject(_e)
      }
      connect.onblocked = function (_e) {
        reject(_e)
      }
      connect.onupgradeneeded = function (_e) {
        connect.result.createObjectStore(IndexDB.tableName1)
        connect.result.createObjectStore(IndexDB.tableName2)
      }
      connect.onsuccess = function (_e) {
        resolve(connect)
      }
    } catch (e) {
      reject(e)
    } finally {
      this.IDB = promise
    }
  }

  static getInstance(dbName: string, version = 1) {
    if (!IndexDB.instance) {
      console.info('getInstance')
      IndexDB.instance = new IndexDB(dbName, version)
    }
    return IndexDB.instance
  }

  async transaction(mode: IDBTransactionMode) {
    const IDB = await this.IDB
    const objectStore = IDB.result.transaction([IndexDB.tableName1, IndexDB.tableName2], mode)
    return [objectStore.objectStore(IndexDB.tableName1), objectStore.objectStore(IndexDB.tableName2)]
  }

  async add(key: IDBValidKey, val: any) {
    const { promise, resolve, reject } = Promise.withResolvers()
    const [transaction1, transaction2] = await this.transaction('readwrite')
    const request1 = transaction1.put(val, key)
    const request2 = transaction2.put(0, key)
    request1.onerror = function (_e) {
      reject(_e)
    }
    request2.onerror = function (_e) {
      reject(_e)
    }
    request1.onsuccess = function (_e) {
      request2.onsuccess = function (_e) {
        resolve(_e)
      }
    }
    return promise
  }

  async get(key: IDBValidKey) {
    const { promise, resolve, reject } = Promise.withResolvers()
    const [transaction1, transaction2] = await this.transaction('readonly')
    const request1 = transaction1.get(key)
    const request2 = transaction2.get(key)
    request1.onerror = function (_e) {
      reject(_e)
    }
    request2.onerror = function (_e) {
      reject(_e)
    }
    request1.onsuccess = function (_e) {
      request2.onsuccess = function (_e) {
        resolve(_e)
      }
    }
    return promise
  }

  async update(key: IDBValidKey, val: any) {
    const { promise, resolve, reject } = Promise.withResolvers()
    const [, transaction] = await this.transaction('readwrite')
    const request = transaction.put(val, key)
    request.onerror = function (_e) {
      reject(_e)
    }
    request.onsuccess = function (_e) {
      resolve(_e)
    }
    return promise
  }

  async single(transaction: IDBObjectStore) {
    let list: { key: string, value: string }[] = []
    const { promise, resolve, reject } = Promise.withResolvers<{ key: string, value: string }[]>()
    const request = transaction.openCursor()
    request.onerror = function (_e) {
      reject(_e)
    }
    request.onsuccess = function (_e: any) {
      const res = _e.target.result
      if (res) {
        list.push({
          key: res.key,
          value: res.value,
        })
        res.continue()
      } else {
        resolve(list)
      }
    }

    return promise
  }

  async all() {
    let list: { value: string; key: string; status: string }[] = []
    const [transaction1, transaction2] = await this.transaction('readonly')
    const res1 = await this.single(transaction1)
    const res2 = await this.single(transaction2)
    list = res1.map((item, index) => {
      return {
        ...item,
        status: res2[index].value
      }
    })
    return list
  }

  async del(key: IDBValidKey) {
    const { promise, resolve, reject } = Promise.withResolvers()
    const [transaction1, transaction2] = await this.transaction('readwrite')
    const request1 = transaction1.delete(key)
    const request2 = transaction2.delete(key)
    request1.onerror = function (_e) {
      reject(_e)
    }
    request2.onerror = function (_e) {
      reject(_e)
    }
    request1.onsuccess = function (_e) {
      request2.onsuccess = function (_e) {
        resolve(_e)
      }
    }
    return promise
  }

  async clear() {
    const { promise, resolve, reject } = Promise.withResolvers()
    const [transaction1, transaction2] = await this.transaction('readwrite')
    const request1 = transaction1.clear()
    const request2 = transaction2.clear()
    request1.onerror = function (_e) {
      reject(_e)
    }
    request2.onerror = function (_e) {
      reject(_e)
    }
    request1.onsuccess = function (_e) {
      request2.onsuccess = function (_e) {
        resolve(_e)
      }
    }
    return promise
  }
}

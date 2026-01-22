// 统一的本地存储封装，自带降级容错
const Storage = {
    /**
     * 读取存储
     * @param {string} key - 存储键名
     * @returns {any} 存储值（解析后的JSON，无则返回null）
     */
    get(key) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            console.warn('LocalStorage 读取失败，使用内存缓存兜底:', e);
            return window.__memoryCache?.[key] || null;
        }
    },

    /**
     * 写入存储
     * @param {string} key - 存储键名
     * @param {any} value - 存储值（会自动JSON.stringify）
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            window.__memoryCache = window.__memoryCache || {};
            window.__memoryCache[key] = value;
        } catch (e) {
            console.warn('LocalStorage 写入失败，使用内存缓存兜底:', e);
            window.__memoryCache = window.__memoryCache || {};
            window.__memoryCache[key] = value;
        }
    },

    /**
     * 删除存储
     * @param {string} key - 存储键名
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
            if (window.__memoryCache) delete window.__memoryCache[key];
        } catch (e) {
            console.warn('LocalStorage 删除失败:', e);
        }
    },

    /**
     * 清空所有存储
     */
    clear() {
        try {
            localStorage.clear();
            window.__memoryCache = {};
        } catch (e) {
            console.warn('LocalStorage 清空失败:', e);
        }
    }
};

// 全局暴露，方便所有页面使用
window.Storage = Storage;
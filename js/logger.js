/**
 * 上报错误日志（生产环境用）
 * @param {Error} error - 错误对象
 * @param {object} context - 上下文信息（如页面URL、操作类型等）
 */
function reportError(error, context = {}) {
    // 开发环境不上报，生产环境开启
    const isProduction = true; // 上线时改为true
    if (!isProduction) return;

    try {
        // 替换为你的错误上报接口（如阿里云日志、Sentry等）
        fetch('/api/report-error', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                timestamp: new Date().toISOString(),
                url: window.location.href,
                userAgent: navigator.userAgent,
                message: error.message,
                stack: error.stack,
                ...context
            })
        });
    } catch (e) {
        console.warn('错误日志上报失败:', e);
    }
}

// 全局监听未捕获错误
window.addEventListener('error', (e) => {
    reportError(e.error, { type: 'global_error' });
});

// 全局监听未处理的Promise拒绝
window.addEventListener('unhandledrejection', (e) => {
    reportError(e.reason, { type: 'promise_rejection' });
});

// 全局暴露上报函数
window.reportError = reportError;
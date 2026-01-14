import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            on('after:run', (results) => {
                // results 对象仅在 `cypress run` 后包含数据
                console.log(results)
                if ('totalTests' in results) {
                    console.log('运行完成！统计如下：')
                    console.log(`  总用例数: ${results.totalTests}`)
                    console.log(`  通过数: ${results.totalPassed}`)
                    console.log(`  失败数: ${results.totalFailed}`)
                    console.log(`  跳过数: ${results.totalSkipped}`)
                    console.log(`  总耗时: ${results.totalDuration}ms`)
                } else {
                    // 你可以在此处将结果发送到监控平台、生成自定义报告等
                    // 例如，如果失败数大于0，可以触发告警
                    throw new Error('本次运行存在失败的用例！')
                }
            })
        },
    },
})

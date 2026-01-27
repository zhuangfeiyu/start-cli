import styles from './Screen.module.scss'

/**
 * 数据大屏页面
 */
function Screen() {
  return (
    <div className={`w-screen h-screen bg-[var(--page-bg)] flex flex-col overflow-hidden ${styles.page_container}`}>
      {/* 头部区域 */}
      <div className={`w-full h-[94px] flex-shrink-0 ${styles.bg_head_bg}`}></div>

      {/* 主体区域 */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        {/* 左侧区域 */}
        <div className="w-96 bg-white/5 border border-white/10 rounded-lg flex-shrink-0"></div>

        {/* 中间区域 */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* 中间上部 */}
          <div className="flex-1 bg-white/5 border border-white/10 rounded-lg min-h-0"></div>

          {/* 中间下部 */}
          <div className="flex-1 bg-white/5 border border-white/10 rounded-lg min-h-0"></div>
        </div>

        {/* 右侧区域 */}
        <div className="w-96 bg-white/5 border border-white/10 rounded-lg flex-shrink-0"></div>
      </div>
    </div>
  )
}

export default Screen


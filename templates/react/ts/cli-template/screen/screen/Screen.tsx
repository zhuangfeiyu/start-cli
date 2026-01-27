import styles from './Screen.module.scss'

function Screen(): JSX.Element {
  return (
    <div className={`w-screen h-screen bg-[var(--page-bg)] flex flex-col overflow-hidden ${styles.page_container}`}>
      <div className={`w-full h-[94px] flex-shrink-0 ${styles.bg_head_bg}`} />

      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        <div className="w-96 bg-white/5 border border-white/10 rounded-lg flex-shrink-0" />

        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 bg-white/5 border border-white/10 rounded-lg min-h-0" />
          <div className="flex-1 bg-white/5 border border-white/10 rounded-lg min-h-0" />
        </div>

        <div className="w-96 bg-white/5 border border-white/10 rounded-lg flex-shrink-0" />
      </div>
    </div>
  )
}

export default Screen

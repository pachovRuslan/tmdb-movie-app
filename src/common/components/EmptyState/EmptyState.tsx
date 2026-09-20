import s from "./EmptyState.module.css"

type Props = {
  title: string
  subtitle?: string
}

export const EmptyState = ({ title, subtitle }: Props) => (
  <div className={s.empty}>
    <h3 className={s.title}>{title}</h3>
    {subtitle && <p className={s.subtitle}>{subtitle}</p>}
  </div>
)
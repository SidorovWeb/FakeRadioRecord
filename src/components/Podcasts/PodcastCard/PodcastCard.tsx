import { FC } from 'react'
import { PodcastsResult } from '../../../types/api'
import s from './PodcastCard.module.scss'
import { AiOutlinePlus } from 'react-icons/ai'

interface PodcastCardProps {
  podcast: PodcastsResult
}
export const PodcastCard: FC<PodcastCardProps> = ({podcast}) => {
  return (
    <li className={s.element} key={podcast.id}>
        <a className={s.card} href='#'>
            <div className={s.blockSubscribe}>
                <button className={s.btnSubscribe}>
                <AiOutlinePlus size={19} />
            </button>
            <span className={s.textSubscribe}>Подписаться</span>
            </div>
            <div className={s.blockText}>
                {podcast.is_new ? (
                    <span className={s.textNew}>New</span>
                ) : (
                    ''
                )}
                <span>{podcast.name}</span>
            </div>
            <div
                className={s.imgBackground}
                style={{
                    backgroundImage: `url(${podcast.cover_vertical})`,
                }}
            ></div>
        </a>
    </li>
  )
}
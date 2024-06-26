import Pagination from '@/features/pagination/components/pagination';
import { getAccountMessages } from '../actions';
import MessageEmptyView from './message-empty-view';
import MessageListItem from './message-list-item';

type Props = {
  currentPage: number;
};

/**
 * メッセージ一覧コンポーネント
 * @returns JSX.Element
 */
export default async function MessageList({ currentPage }: Props) {
  const messages = await getAccountMessages({ page: currentPage });
  const totalPages = messages.meta.total_pages;
  const isEmpty = messages.data.length === 0;

  return isEmpty ? (
    <MessageEmptyView />
  ) : (
    <>
      <div className="h-calc w-full overflow-y-auto rounded-[6px] bg-white-base p-[16px] shadow-base md:w-4/5 md:p-[24px]">
        {messages.data.map((message, index) => {
          const isFirst = index === 0;

          return (
            <div key={message.id}>
              {!isFirst && <div className="my-4 border-t-[1px]" />}

              <MessageListItem message={message} />
            </div>
          );
        })}
      </div>
      {!!totalPages && <Pagination totalPages={totalPages} />}
    </>
  );
}

// components/MessageList.js
import { Typography } from '@/components/ui/typography';
import MessageEmptyView from './message-empty-view';
import MessageListItem from './message-list-item';

/**
 * メッセージ一覧コンポーネント
 * @returns JSX.Element
 */
export default function MessageList() {
  // TODO: メッセージ(ストアからのメッセージ、当サイトからのお知らせ等)を取得するAPIを叩く

  // demo data
  const messages = [
    {
      id: 1,
      title: 'hogeのお知らせ',
      date: '2024年3月26日',
      content:
        'いつも当サイトをご利用いただき、誠にありがとうございます。皆様に大切なお知らせがあります。この度、当店はさらに魅力的な商品を取り揃えるため、新たなラインナップを拡充いたしました。また、お客様の買い物体験をより良いものにするためのウェブサイトの改善にも力を入れております。',
      imgSrc: '/item-demo.png',
      star: 3,
      rate: '4.1(188)'
    },
    {
      id: 2,
      title: 'bibinのお知らせ',
      date: '2024年4月7日',
      content:
        'いつも当サイトをご利用いただき、誠にありがとうございます。皆様に大切なお知らせがあります。この度、当店はさらに魅力的な商品を取り揃えるため、新たなラインナップを拡充いたしました。また、お客様の買い物体験をより良いものにするためのウェブサイトの改善にも力を入れております。',
      imgSrc: '/shop.png',
      star: 4,
      rate: '4.1(188)'
    },
    {
      id: 3,
      title: 'bibinのお知らせ',
      date: '2024年4月7日',
      content:
        'いつも当サイトをご利用いただき、誠にありがとうございます。皆様に大切なお知らせがあります。この度、当店はさらに魅力的な商品を取り揃えるため、新たなラインナップを拡充いたしました。また、お客様の買い物体験をより良いものにするためのウェブサイトの改善にも力を入れております。',
      imgSrc: '/shop.png',
      star: 5,
      rate: '4.1(188)'
    }
  ];

  return (
    <>
      <Typography as="boldXLarge" element="p" className="mb-[24px] text-[24px] text-black-90">
        メッセージ
      </Typography>
      {messages.length === 0 ? (
        <MessageEmptyView />
      ) : (
        <div className="h-screen-calc w-4/5 overflow-y-auto p-[24px]">
          {messages.map((message) => (
            <div key={message.id}>
              <MessageListItem
                title={message.title}
                date={message.date}
                content={message.content}
                imgSrc={message.imgSrc}
                star={message.star}
                rate={message.rate}
              />
              <div className="my-[16px] border-t-[1px]" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

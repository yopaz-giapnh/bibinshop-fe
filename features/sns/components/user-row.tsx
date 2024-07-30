import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import Link from 'next/link';
import FollowUnfollowButton from './follow-unfollow-button';

type Props = {
  unique_key: string;
  nickname: string;
  tags: string[];
  avatar: string;
  isFollowee: boolean;
  userType: string;
};

export default function UserRow(props: Props) {
  return (
    <div className="py-6">
      <div className="flex items-center md:items-start">
        {props.userType !== 'account' ? (
          <Link href={`/user-detail/${props.unique_key}`} className="flex-shrink-0">
            <Image
              src={props.avatar}
              alt="avatar"
              className="rounded-full"
              width={64}
              height={64}
            />
          </Link>
        ) : (
          <div className="flex-shrink-0">
            <Image
              src={props.avatar}
              alt="avatar"
              className="rounded-full"
              width={64}
              height={64}
            />
          </div>
        )}
        <div className="ml-[8px] flex flex-col">
          <Typography
            as="bold"
            element="p"
            className="mb-[8px] max-w-[100px] overflow-hidden whitespace-normal break-words text-[16px] text-black-90 md:max-w-[320px]"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {props.nickname}
          </Typography>
          <div className="hidden flex-wrap gap-2 md:flex">
            {props.tags.map((t, idx) => (
              <UserTag tag={t} key={idx} />
            ))}
          </div>
        </div>
        {props.userType !== 'account' && (
          <FollowUnfollowButton
            isFollowing={props.isFollowee}
            unique_key={props.unique_key}
            username={props.nickname}
          />
        )}
      </div>
      <div className="mt-2 flex flex-wrap md:hidden ">
        {props.tags.map((t, idx) => (
          <UserTag tag={t} key={idx} />
        ))}
      </div>
    </div>
  );
}

function UserTag(props: { tag: string }) {
  return (
    <div className="mb-[4px] mr-[4px] rounded-[16px] bg-[#D9F0FF] px-3 py-1 text-xs font-bold md:mb-0 md:mr-0">
      {props.tag}
    </div>
  );
}

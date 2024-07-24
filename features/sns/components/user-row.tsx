import FollowUnfollowButton from './follow-unfollow-button';

type Props = {
  unique_key: string;
  firstName: string;
  lastName: string;
  tags: string[];
  avatar: string;
  isFollowee: boolean;
};
export default function UserRow(props: Props) {
  return (
    <div className="mx-6 py-6 ">
      <div className="flex h-10 items-center md:h-16">
        <img src={props.avatar} alt="avatar" className="w-10 rounded-full md:w-16" />

        <div className="ml-4 flex flex-col md:h-16 md:justify-between">
          <p className="mb-1 text-sm font-bold">
            {props.firstName} {props.lastName}
          </p>
          <div className="flex hidden gap-2 md:flex">
            {props.tags.map((t, idx) => (
              <UserTag tag={t} key={idx} />
            ))}
          </div>
        </div>

        <FollowUnfollowButton
          isFollowing={props.isFollowee}
          unique_key={props.unique_key}
          username={props.lastName + props.firstName}
        />
      </div>
      <div className="mt-2 flex w-[263px] flex-wrap justify-center md:hidden">
        {props.tags.map((t, idx) => (
          <>
            <UserTag tag={t} key={idx} />
            <UserTag tag={t} key={idx} />
            <UserTag tag={t} key={idx} />
          </>
        ))}
      </div>
    </div>
  );
}

function UserTag(props: { tag: string }) {
  return (
    <div className="m-1 rounded-[16px] bg-[#D9F0FF] px-3 py-1 text-xs font-bold">{props.tag}</div>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandList } from '@/components/ui/command';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Typography } from '@/components/ui/typography';
import { useEffect, useRef, useState } from 'react';
import { getConcerns } from '../actions';
import {
  HairConcernEntry,
  HealthConcernEntry,
  SkinColorEntry,
  SkinConcernEntry,
  SkinTypeEntry,
  colors,
  hairConcerns,
  healthConcerns,
  skinConcerns,
  skinTypes
} from '../constants';

interface SnsInputSortBarProps {
  onSortChange: (sortBy: 'followers_asc' | 'followers_desc') => void;
}
export function SnsInputSortBar({ onSortChange }: SnsInputSortBarProps) {
  const [sortOption, setSortOption] = useState('フォロワー数(昇順)');
  const [selectionVisible, setSelectionVisible] = useState(false);
  const [selectedSkinType, setSelectedSkinType] = useState<SkinTypeEntry | undefined>(undefined);
  const [selectedSkinColor, setSelectedSkinColor] = useState<SkinColorEntry | undefined>(undefined);
  const [selectedSkinConcerns, setSelectedSkinConcerns] = useState<SkinConcernEntry[]>([]);
  const [selectedHairConcerns, setSelectedHairConcerns] = useState<HairConcernEntry[]>([]);
  const [selectedHealthConcerns, setSelectedHealthConcerns] = useState<HealthConcernEntry[]>([]);
  const [closeTimeout, setCloseTimeout] = useState<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchConcerns = async () => {
      const result = await getConcerns();
      if (result.skinType)
        setSelectedSkinType(skinTypes.find((type) => type.value === result.skinType));
      if (result.personalColor)
        setSelectedSkinColor(colors.find((color) => color.value === result.personalColor));
      if (result.skinConcerns)
        setSelectedSkinConcerns(
          skinConcerns.filter((concern) => result.skinConcerns?.includes(concern.value[0]))
        );
      if (result.hairConcerns)
        setSelectedHairConcerns(
          hairConcerns.filter((concern) => result.hairConcerns?.includes(concern.value[0]))
        );
      if (result.healthConcerns)
        setSelectedHealthConcerns(
          healthConcerns.filter((concern) => result.healthConcerns?.includes(concern.value[0]))
        );
    };
    fetchConcerns();
  }, []);

  const hasInput =
    selectedSkinType ||
    selectedSkinColor ||
    selectedSkinConcerns?.length ||
    selectedHairConcerns?.length ||
    selectedHealthConcerns?.length;

  const handleSortChange = (value: string) => {
    const newSortOption = value === '1' ? 'フォロワー数(昇順)' : 'フォロワー数(降順)';
    setSortOption(newSortOption);
    onSortChange(value === '1' ? 'followers_asc' : 'followers_desc');
  };
  const openCommands = () => {
    clearTimeout(closeTimeout);
    setSelectionVisible(true);
  };

  useEffect(() => {
    if (selectionVisible) return;
    //params changed, should refresh search?
  }, [selectionVisible]);

  return (
    <div className="mt-[24px] flex w-full flex-col items-center justify-center px-[8px] md:flex-row md:justify-between">
      <Command className="w-full bg-paleFrostBlue">
        <CommandInput
          ref={ref}
          placeholder={hasInput ? undefined : '例：普通肌・ニキビ・毛穴'}
          className="overflow-x-auto overflow-y-hidden rounded-[44px] border-2 border-bibinBlue-100 bg-white-base md:w-2/3"
          onFocus={openCommands}
          onBlur={() => {
            setCloseTimeout(
              setTimeout(async () => {
                setSelectionVisible(false);
              }, 150)
            );
          }}
          children={
            hasInput ? (
              <div className="flex h-full items-center whitespace-nowrap">
                {selectedSkinType && (
                  <Pill
                    text={selectedSkinType.text}
                    onClick={() => ref.current?.focus()}
                    onRemove={() => setSelectedSkinType(undefined)}
                  />
                )}
                {selectedSkinColor && (
                  <Pill
                    text={selectedSkinColor.name}
                    onClick={() => ref.current?.focus()}
                    onRemove={() => setSelectedSkinColor(undefined)}
                  />
                )}
                {selectedSkinConcerns?.map((concern, index) => (
                  <Pill
                    key={index}
                    text={concern.text}
                    onClick={() => ref.current?.focus()}
                    onRemove={() =>
                      setSelectedSkinConcerns(
                        selectedSkinConcerns.filter((item) => item.value !== concern.value)
                      )
                    }
                  />
                ))}
                {selectedHairConcerns?.map((concern, index) => (
                  <Pill
                    key={index}
                    text={concern.text}
                    onClick={() => ref.current?.focus()}
                    onRemove={() =>
                      setSelectedHairConcerns(
                        selectedHairConcerns.filter((item) => item.value !== concern.value)
                      )
                    }
                  />
                ))}
                {selectedHealthConcerns?.map((concern, index) => (
                  <Pill
                    key={index}
                    text={concern.text}
                    onClick={() => ref.current?.focus()}
                    onRemove={() =>
                      setSelectedHealthConcerns(
                        selectedHealthConcerns.filter((item) => item.value !== concern.value)
                      )
                    }
                  />
                ))}
              </div>
            ) : undefined
          }
        />
        <div>
          <CommandList
            className={
              'absolute left-0 w-full rounded-md bg-white-base px-4 pt-4 md:left-auto md:max-w-[52%] md:border-2 ' +
              (selectionVisible ? '' : ' hidden ')
            }
          >
            <Typography className="p-[8px]" element="h3" as="boldXLarge">
              肌質で検索
            </Typography>
            <Typography className="p-[8px]" element="p" as="boldSmall">
              肌タイプ
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {skinTypes.map((type, index) => (
                <Button
                  key={index}
                  variant={selectedSkinType?.value == type.value ? 'secondary' : 'outline'}
                  className={
                    'm-1 border-2 p-6' +
                    (selectedSkinType?.value == type.value ? ' border-bibinBlue-100 ' : '')
                  }
                  onClick={(e) => {
                    clearTimeout(closeTimeout);
                    ref.current?.focus();
                    setSelectedSkinType(selectedSkinType?.value == type.value ? undefined : type);
                  }}
                >
                  {type.text}
                </Button>
              ))}
            </div>
            <Typography className="p-[8px]" element="p" as="boldSmall">
              パーソナルカラー
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {colors.map((type, index) => (
                <SkinButton
                  key={index}
                  name={type.name}
                  color={type.color}
                  active={selectedSkinColor?.value == type.value}
                  onClick={() => {
                    clearTimeout(closeTimeout);
                    ref.current?.focus();
                    setSelectedSkinColor(selectedSkinColor?.value == type.value ? undefined : type);
                  }}
                />
              ))}
            </div>
            <Typography className="p-[8px]" element="p" as="boldSmall">
              肌タイプ
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {skinConcerns.map((concern, index) => (
                <Button
                  key={index}
                  variant={
                    selectedSkinConcerns.find((c) => c.value[0] == concern.value[0])
                      ? 'secondary'
                      : 'outline'
                  }
                  className={
                    'm-1 border-2 p-6' +
                    (selectedSkinConcerns.find((c) => c.value[0] == concern.value[0])
                      ? ' border-bibinBlue-100 '
                      : '')
                  }
                  onClick={(e) => {
                    clearTimeout(closeTimeout);
                    ref.current?.focus();
                    if (selectedSkinConcerns.find((c) => c.value[0] == concern.value[0])) {
                      setSelectedSkinConcerns(
                        selectedSkinConcerns.filter((item) => item.value[0] !== concern.value[0])
                      );
                    } else {
                      setSelectedSkinConcerns([...selectedSkinConcerns, concern]);
                    }
                  }}
                >
                  {concern.text}
                </Button>
              ))}
            </div>
            <Typography className="p-[8px]" element="p" as="boldSmall">
              頭皮・毛髪の悩み
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {hairConcerns.map((concern, index) => (
                <Button
                  key={index}
                  variant={
                    selectedHairConcerns?.find((c) => c.value[0] == concern.value[0])
                      ? 'secondary'
                      : 'outline'
                  }
                  className={
                    'm-1 border-2 p-6' +
                    (selectedHairConcerns?.find((c) => c.value[0] == concern.value[0])
                      ? ' border-bibinBlue-100 '
                      : '')
                  }
                  onClick={(e) => {
                    clearTimeout(closeTimeout);
                    ref.current?.focus();
                    if (selectedHairConcerns.find((c) => c.value[0] == concern.value[0])) {
                      setSelectedHairConcerns(
                        selectedHairConcerns.filter((item) => item.value[0] !== concern.value[0])
                      );
                    } else {
                      setSelectedHairConcerns([...selectedHairConcerns, concern]);
                    }
                  }}
                >
                  {concern.text}
                </Button>
              ))}
            </div>
            <Typography className="p-[8px]" element="p" as="boldSmall">
              健康の悩み
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {healthConcerns.map((concern, index) => (
                <Button
                  key={index}
                  variant={
                    selectedHealthConcerns.find((c) => c.value[0] == concern.value[0])
                      ? 'secondary'
                      : 'outline'
                  }
                  className={
                    'm-1 border-2 p-6' +
                    (selectedHealthConcerns.find((c) => c.value[0] == concern.value[0])
                      ? ' border-bibinBlue-100 '
                      : '')
                  }
                  onClick={(e) => {
                    clearTimeout(closeTimeout);
                    ref.current?.focus();
                    if (selectedHealthConcerns.find((c) => c.value[0] == concern.value[0])) {
                      setSelectedHealthConcerns(
                        selectedHealthConcerns.filter((item) => item.value[0] !== concern.value[0])
                      );
                    } else {
                      setSelectedHealthConcerns([...selectedHealthConcerns, concern]);
                    }
                  }}
                >
                  {concern.text}
                </Button>
              ))}
            </div>
          </CommandList>
        </div>
      </Command>
      <Select onValueChange={handleSortChange}>
        <SelectTrigger className="mt-[8px] h-[48px] w-[300px] rounded-full border-[1px] border-bibinBlue-100 bg-paleFrostBlue px-[24px] py-[4px] text-[14px] font-semibold text-bibinBlue-100 md:mt-0">
          {`並べ替え: ${sortOption}`}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">フォロワー数(昇順)</SelectItem>
          <SelectItem value="2">フォロワー数(降順)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

type PillParams = {
  text: string;
  onRemove: () => void;
  onClick?: () => void;
};
function Pill({ text, onRemove, onClick }: PillParams) {
  return (
    <Typography
      className="mx-1 flex h-8 items-center rounded-full bg-[#D9F0FF] pl-2"
      element="div"
      as="xSmall"
      onClick={onClick}
    >
      {text}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onRemove}
        style={{ cursor: 'pointer' }}
      >
        <path
          d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z"
          fill="#51B7FF"
        />
      </svg>
    </Typography>
  );
}

type SkinParams = {
  name: string;
  color: string;
  active: boolean;
  onClick: () => void;
};
function SkinButton({ name, color, active, onClick }: SkinParams) {
  return (
    <Button
      variant={active ? 'secondary' : 'outline'}
      className={'m-1 h-fit border-2 p-3 ' + (active ? ' border-bibinBlue-100 ' : '')}
      onClick={onClick}
    >
      <input type="radio" name="skinType" readOnly checked={active} className="mx-2" />
      <div className="flex flex-col items-center">
        <div
          className="rounded-full"
          style={{
            boxSizing: 'border-box',
            width: '32px',
            height: '32px',
            backgroundColor: color,
            border: '1px solid rgba(0, 0, 0, 0.1)',
            order: 0,
            flex: 'none',
            flexGrow: 0
          }}
        ></div>
        {name}
      </div>
    </Button>
  );
}

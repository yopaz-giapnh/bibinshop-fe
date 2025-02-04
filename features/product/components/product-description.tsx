'use client';

import { Typography } from '@/components/ui/typography';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PRODUCT_PROPERTY_MAP } from '../constants';
import { Product } from '../types';

type Props = {
  product: Product;
};

export function ProductDescription({ product }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsTruncated(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
    }
  }, [product.attributes.description]);

  const expandDescription = () => {
    setIsExpanded(true);
  };

  return (
    <div className="flex flex-col px-4 md:max-w-[46vw] md:px-0">
      <Typography as="boldTitle" element="h1" className="text-[20px] md:text-[24px]">
        商品情報
      </Typography>

      {Object.entries(PRODUCT_PROPERTY_MAP).map(([key, value]) => {
        const property = product.productProperties.find((pp) => pp.attributes.name === key);
        // TODO: 本来はBEで管理するようにしたい
        if (!property || property.attributes.value === 'Placeholder') return null;
        return (
          <div key={key} className="flex">
            <Typography as="body" element="h2" className="text-black-base">
              {value}：
            </Typography>
            <Typography as="body" element="p" className="text-black-base">
              {property.attributes.value}
            </Typography>
          </div>
        );
      })}

      {product.attributes.description != null && (
        <div className="mt-2">
          <div
            ref={descriptionRef}
            className={`rich-text-content overflow-hidden transition-all duration-300 ${
              isExpanded ? 'max-h-full' : 'max-h-[4.5em]'
            }`}
            dangerouslySetInnerHTML={{ __html: product.attributes.description }}
          />
          {isTruncated && !isExpanded && (
            <div className="mt-[6px] flex cursor-pointer items-center" onClick={expandDescription}>
              <Typography as="boldSmall" element="p" className="text-bibinBlue-100">
                もっと見る
              </Typography>
              <ChevronDown className="h-[21px] w-5 text-bibinBlue-100" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

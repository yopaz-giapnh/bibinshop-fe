import { BackButton } from '@/components/button/back-button';
import { Typography } from '@/components/ui/typography';

/**
 * 特定商取引法に基づく表記コンポーネント
 * @returns JSX.Element
 */
export function CommercialTransactions() {
  return (
    <div className="mx-auto max-w-4xl rounded-xl bg-white-base p-4 md:p-8">
      <div className="mb-[16px] flex w-full items-center justify-between md:mb-[24px] md:justify-center">
        <BackButton />
        <Typography
          as="boldXLarge"
          element="h1"
          className="text-[16px] text-black-90 md:text-[24px]"
        >
          特定商取引法に基づく表記
        </Typography>
        <div className="h-7 w-7" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <tbody>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap border-r border-gray-200 bg-gray-50 px-4 py-4 text-left align-top font-bold md:w-1/4">
                販売業者
              </th>
              <td className="px-4 py-4">株式会社bibin</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap border-r border-gray-200 bg-gray-50 px-4 py-4 text-left align-top font-bold">
                代表責任者
              </th>
              <td className="px-4 py-4">代表取締役 仲大輔</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap border-r border-gray-200 bg-gray-50 px-4 py-4 text-left align-top font-bold">
                所在地
              </th>
              <td className="px-4 py-4">
                〒107-0052
                <br />
                東京都港区赤坂3-21-15 東都赤坂ビル2A
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap border-r border-gray-200 bg-gray-50 px-4 py-4 text-left align-top font-bold">
                電話サポート対応時間
              </th>
              <td className="px-4 py-4">午前10時から午後18時まで</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap border-r border-gray-200 bg-gray-50 px-4 py-4 text-left align-top font-bold">
                電話番号
              </th>
              <td className="px-4 py-4">03-6441-2751</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap border-r border-gray-200 bg-gray-50 px-4 py-4 text-left align-top font-bold">
                メール受付時間
              </th>
              <td className="px-4 py-4">午前10時から午後18時まで</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap border-r border-gray-200 bg-gray-50 px-4 py-4 text-left align-top font-bold">
                メールアドレス
              </th>
              <td className="px-4 py-4">info@bibinews.jp</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap border-r border-gray-200 bg-gray-50 px-4 py-4 text-left align-top font-bold">
                サイトURL
              </th>
              <td className="px-4 py-4">https://bibin.shop/</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap border-r border-gray-200 bg-gray-50 px-4 py-4 text-left align-top font-bold">
                商品の販売価格
              </th>
              <td className="px-4 py-4">各商品の掲載ページをご参照ください。</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap border-r border-gray-200 bg-gray-50 px-4 py-4 text-left align-top font-bold">
                商品代金以外の手数料
              </th>
              <td className="px-4 py-4">
                【配送料】
                <br />
                送料：ご購入先のブランドの所在地や配送業者により異なります。
                <br />
                【手数料】
                <br />
                ・コンビニ決済手数料：132円（税込）
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap border-r border-gray-200 bg-gray-50 px-4 py-4 text-left align-top font-bold">
                支払方法
              </th>
              <td className="px-4 py-4">
                以下のいずれかの支払方法をお選びいただけます。
                <br />
                1.クレジットカード決済（Visa、American Express、MasterCard、JCB、）
                <br />
                2.コンビニエンスストアでの決済
                <br />
                3.PayPay決済
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap border-r border-gray-200 bg-gray-50 px-4 py-4 text-left align-top font-bold">
                支払時期
              </th>
              <td className="px-4 py-4">
                【クレジットカード決済】
                <br />
                商品注文時
                <br />
                【コンビニ決済】
                <br />
                注文日翌日から3営業日以内
                <br />
                【PayPay決済】
                <br />
                商品注文時
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap border-r border-gray-200 bg-gray-50 px-4 py-4 text-left align-top font-bold">
                商品の引渡時期
              </th>
              <td className="px-4 py-4">
                お客様が商品をご注文してお支払いを確定させた後、通常、商品のお引渡しまでは海外発送の場合、4日～7日前後営業日以内です。ただし、商品によっては、海外からの輸送が必要なことや在庫の状況等によって、それ以上にお時間をいただく場合もございます。お引渡しが遅延することが判明した場合等には、弊社カスタマーサポートよりご連絡をさせていただくことがあります。
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap border-r border-gray-200 bg-gray-50 px-4 py-4 text-left align-top font-bold">
                返品・交換
              </th>
              <td className="px-4 py-4">利用規約ページをご参照ください。</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap border-r border-gray-200 bg-gray-50 px-4 py-4 text-left align-top font-bold">
                返品送料
              </th>
              <td className="px-4 py-4">
                商品に欠陥がある場合は当方負担とし、その他利用者様の都合によるときは利用者様負担とします。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

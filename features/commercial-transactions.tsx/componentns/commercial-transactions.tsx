import { BackButton } from '@/components/button/back-button';
import { Typography } from '@/components/ui/typography';

/**
 * 特定商取引法に基づく表記コンポーネント
 * @returns JSX.Element
 */
// TODO: stripeの申請のために仮の内容で特定商取引法を表記。正規の内容貰い次第更新予定。
export function CommercialTransactions() {
  return (
    <div className="mx-auto max-w-4xl rounded-xl bg-white-base p-8">
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

      <div className="space-y-8">
        <section>
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 font-bold">販売業者</h3>
              <p className="leading-relaxed">株式会社bibin</p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">代表責任者</h3>
              <p className="leading-relaxed">仲 大輔</p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">所在地</h3>
              <p className="leading-relaxed">
                〒107-0052
                <br />
                東京都港区赤坂3-21-15 東都赤坂ビル2A
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">電話番号</h3>
              <p className="leading-relaxed">03-6441-2751</p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">メールアドレス</h3>
              <p className="leading-relaxed">info@bibinews.jp</p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">商品の販売価格</h3>
              <p className="leading-relaxed">
                各商品ページに表示される価格に準じます。
                <br />
                ※表示価格は税込みとなります。
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">商品以外の必要料金</h3>
              <p className="leading-relaxed">
                送料：全国一律880円（税込）
                <br />
                ※商品代金10,000円以上のご注文で送料無料
                <br />
                手数料：無料
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">支払方法</h3>
              <p className="leading-relaxed">
                クレジットカード決済（VISA、MasterCard、JCB、American Express、Diners Club
                International、Discover、UnionPay/銀聯、eftpos）
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">商品の引渡し時期</h3>
              <p className="leading-relaxed">
                在庫がある場合：ご注文確認後3営業日以内に発送
                <br />
                在庫がない場合：入荷次第発送（入荷予定はメールにてご連絡）
                <br />
                ※天候や交通事情により遅延する場合があります。
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">返品・交換について</h3>
              <p className="leading-relaxed">
                返品可能期間：商品到着後14日以内に要連絡
                <br />
                返品・交換の条件：
                <br />
                ・未使用・未開封の商品であること
                <br />
                ・商品タグが付いた状態であること
                <br />
                ・商品到着後14日以内にご連絡いただくこと
                <br />
                返品時の送料負担：
                <br />
                ・不良品・誤送の場合：当社負担
                <br />
                ・お客様都合の場合：お客様負担
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">解約・返品の連絡先</h3>
              <p className="leading-relaxed">
                電話：03-6441-2751（受付時間：平日10:00～17:00）
                <br />
                メール：info@bibinews.jp
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">販売数量</h3>
              <p className="leading-relaxed">
                各商品ページに在庫数を表示
                <br />
                ※在庫数は随時更新されます。
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">引渡し可能時期</h3>
              <p className="leading-relaxed">各商品ページに記載の発送予定日に準じます。</p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">お支払い期限</h3>
              <p className="leading-relaxed">注文時決済</p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">返金方法</h3>
              <p className="leading-relaxed">カード会社を通じて返金</p>
            </div>

            <div>
              <h3 className="mb-4 font-bold">その他の特約事項</h3>
              <p className="leading-relaxed">
                ・当社が必要と判断した場合、予告なく本規約を変更することがあります。
                <br />
                ・システムメンテナンス等により、一時的にサービスを停止する場合があります。
                <br />
                ・災害等の不可抗力により、商品の配送が遅延または中止になる場合があります。
                <br />
                ※本内容は予告なく変更される場合があります。最新の情報は当サイトでご確認ください。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

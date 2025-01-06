import { BackButton } from '@/components/button/back-button';
import { Typography } from '@/components/ui/typography';

/**
 * プライバシーポリシーコンポーネント
 * @returns JSX.Element
 */
export function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl rounded-xl bg-white-base p-8">
      <div className="mb-8">
        <BackButton />
        <Typography
          as="boldXLarge"
          element="h1"
          className="text-center text-[20px] text-black-90 md:text-[24px]"
        >
          当社サイトに関するプライバシーポリシー
        </Typography>
      </div>

      <div className="space-y-8">
        <section>
          <div className="mb-12">
            <p className="text-base leading-relaxed">
              株式会社bibinが運営するＥＣサイト（以下「当社サイト」といいます。）では、以下
              のとおり、業務上取り扱う個人情報の保護について本プライバシーポリシー（以下「本ポ
              リシー」といいます。）を定め、個人情報に関する法規制、及び本ポリシーを遵守いたし
              ます。
            </p>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="mb-4 text-base font-bold">1．対象となる個人情報</h3>
              <p className="mb-4 text-base leading-relaxed">
                本ポリシーにおいて対象とする個人情報は、下記のとおりとします。
              </p>
              <div className="space-y-4">
                <ol className="list-none space-y-2 pl-0">
                  <li className="flex gap-4">
                    <span>①</span>
                    <span>
                      当社サイト上で出品者（当社サイトを介した取引において対象商品を提供する
                      者）又は利用者（当社サイトを介した取引において対象商品を購入する者）とし
                      て登録されている会員（以下、出品者と利用者を併せるときは、単に「会員」と
                      いいます。）の氏名（会員が法人であるときは商号）、住所（会員が法人である
                      ときは本店所在地）、生年月日（会員が法人であるときは設立年月日）等、会員
                      の特定に必要なものとして当社サイト上で登録を必要とした事項
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span>②</span>
                    <span>当社サイト上で会員が登録した電話番号、メールアドレス</span>
                  </li>
                  <li className="flex gap-4">
                    <span>③</span>
                    <span>当社サイト上で会員が登録したクレジットカード情報等の決済情報</span>
                  </li>
                  <li className="flex gap-4">
                    <span>④</span>
                    <span>当社サイト上で商品を購入した場合における配送先の名称、及び住所</span>
                  </li>
                  <li className="flex gap-4">
                    <span>⑤</span>
                    <span>当社サイト上で商品を出品した場合における、出品履歴</span>
                  </li>
                  <li className="flex gap-4">
                    <span>⑥</span>
                    <span>当社サイト上で商品を購入した場合における、購入履歴</span>
                  </li>
                </ol>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-base font-bold">2．個人情報の取得方法</h3>
              <p className="mb-4 text-base leading-relaxed">
                個人情報の取得は、下記のとおり行います。
              </p>
              <ol className="list-none space-y-2 pl-0">
                <li className="flex gap-4">
                  <span>①</span>
                  <span>当社サイト上で会員自らが登録を行う方法</span>
                </li>
                <li className="flex gap-4">
                  <span>②</span>
                  <span>通話やメール等の方法により、株式会社bibinが会員から聴取する方法</span>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="mb-4 text-base font-bold">3．個人情報の利用目的</h3>
              <p className="mb-4 text-base leading-relaxed">
                個人情報の利用は、下記の目的に限ります。
              </p>
              <ol className="list-none space-y-2 pl-0">
                <li className="flex gap-4">
                  <span>①</span>
                  <span>
                    当社サイトを介した取引において対象商品を配送し、又は代金を決済するため
                  </span>
                </li>
                <li className="flex gap-4">
                  <span>②</span>
                  <span>会員から問い合わせがあった際の対応のため</span>
                </li>
                <li className="flex gap-4">
                  <span>③</span>
                  <span>
                    会員が購入し又は購入を検討した商品と類似又は関連する商品を案内するため
                  </span>
                </li>
                <li className="flex gap-4">
                  <span>④</span>
                  <span>その他、上記利用目的に付随する目的のため</span>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="mb-4 text-base font-bold">4．個人情報の第三者提供</h3>
              <p className="mb-4 text-base leading-relaxed">
                次に掲げる場合を除き、お客様の個人情報を第三者に提供することはございません。
              </p>
              <ol className="list-none space-y-2 pl-0">
                <li className="flex gap-4">
                  <span>①</span>
                  <span>会員の同意を得られた場合</span>
                </li>
                <li className="flex gap-4">
                  <span>②</span>
                  <span>法令に基づく場合</span>
                </li>
                <li className="flex gap-4">
                  <span>③</span>
                  <span>
                    人の生命、身体又は財産の保護のために必要がある場合であって、ご本人様の同
                    意を得ることが困難な場合
                  </span>
                </li>
                <li className="flex gap-4">
                  <span>④</span>
                  <span>
                    国の機関もしくは地方公共団体又はその委託を受けた者が法令の定める事務を遂
                    行することに対して協力する必要がある場合であって、会員の同意を得ることに
                    よって当該事務の遂行に支障を及ぼすおそれがある場合
                  </span>
                </li>
                <li className="flex gap-4">
                  <span>⑤</span>
                  <span>
                    業務を円滑に遂行するため、利用目的の達成に必要な範囲内で個人情報の取扱い
                    の全部又は一部を委託する場合
                  </span>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="mb-4 text-base font-bold">5．個人情報の開示・訂正・利用停止等</h3>
              <p className="text-base leading-relaxed">
                会員から個人情報について開示、訂正、利用停止等の申し出があった場合には、下記
                問合わせ窓口に申し出ることができます。申し出に対しては、会員本人であることを
                確認させていただいたうえで、合理的な期間内に対応いたします。
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-base font-bold">6．個人情報に関する問い合わせ窓口</h3>
              <p className="mb-6 text-base leading-relaxed">
                個人情報に関する問い合わせ窓口は下記のとおりとします。
              </p>
              <div className="mb-6 text-center text-base">記</div>
              <div className="mb-8 space-y-2 text-base">
                <p className="mb-4">株式会社bibin</p>
                <p className="mb-6">mail：info@bibinews.jp</p>
                <p>※お問い合わせは24時間受け付けております。</p>
                <p className="whitespace-pre-wrap">
                  ※土・日曜日、祝日、その他運営事務局休業日の場合は、翌営業日以降の対応と
                  させていただきます。
                </p>
              </div>
              <div className="text-right text-base">以上</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

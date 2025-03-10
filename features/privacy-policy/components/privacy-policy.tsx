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
              株式会社bibin（東京都港区赤坂3－21－15東都赤坂ビル２A、代表取締役仲大輔、以下
              「当社」といいます。）が運営するＥＣサイト（以下「当社サイト」といいます。）では、
              以下 のとおり、業務上取り扱う個人情報の保護について本プライバシーポリシー（以下
              「本ポリシー」といいます。）を定め、個人情報に関する法規制、及び本ポリシーを遵守
              いたします。
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
                  <span>通話やメール等の方法により、当社が会員から聴取する方法</span>
                </li>
                <li className="flex gap-4">
                  <span>③</span>
                  <span>会員から直接又は書面等の媒体を通じて提供いただく方法</span>
                </li>
                <li className="flex gap-4">
                  <span>④</span>
                  <span>上記の他、会員の同意を得た第三者から提供を受ける方法等、適法な方法</span>
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
                  <span>
                    当社サイトで提供するサービスに関して会員に連絡するため又は会員から問い合わせがあった際の対応のため
                  </span>
                </li>
                <li className="flex gap-4">
                  <span>③</span>
                  <span>
                    会員が購入し又は購入を検討した商品と類似又は関連する商品を案内するため
                  </span>
                </li>
                <li className="flex gap-4">
                  <span>④</span>
                  <span>
                    利用規約及び出品者規約記載の禁止事項等に関する調査及びそれに基づく措置のため
                  </span>
                </li>
                <li className="flex gap-4">
                  <span>⑤</span>
                  <span>当社サービスの利用状況の確認及びサービス改善のため</span>
                </li>
                <li className="flex gap-4">
                  <span>⑥</span>
                  <span>当社サービスの案内のため</span>
                </li>
                <li className="flex gap-4">
                  <span>⑦</span>
                  <span>
                    当社サービスに対するアンケートの実施及び当社サービスに関するプレゼントの発送のため
                  </span>
                </li>
                <li className="flex gap-4">
                  <span>⑧</span>
                  <span>その他、上記利用目的に付随する目的のため</span>
                </li>
              </ol>
              <p className="mt-4 text-base leading-relaxed">
                なお、当社では、当社サービスの利便性向上を目的として、個人情報を、個人を特定できない形による集計・統計データを作成するために利用することがあります。
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-base font-bold">4．個人情報の第三者提供</h3>
              <p className="mb-4 text-base leading-relaxed">
                （1）次に掲げる場合を除き、お客様の個人情報を第三者に提供することはございません。
                ただし、お客様が出品者に対し個人情報を送信された場合、当該出品者に個人情報が
                提供されることになります。その際には、出品者が自ら定める個人情報保護管理規定
                に従い個人情報を管理することになります。
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
              <p className="mb-4 mt-4 text-base leading-relaxed">
                （2）前項の提供先には、お客様のお住まいの国又は地域以外の国又は地域にある委託先⑤
                などの第三者を含みます。提供先の事業者の所在国又は地域は以下のとおりです。
              </p>
              <p className="mb-4 text-base font-bold leading-relaxed">大韓民国</p>
              <p className="mb-2 text-base leading-relaxed">・大韓民国の個人情報保護制度</p>
              <p className="mb-4 text-base leading-relaxed">
                個人情報保護委員会が提供する情報を以下のリンクからご確認ください。
              </p>
              <p className="mb-4 text-base leading-relaxed">
                <a
                  href="https://www.ppc.go.jp/enforcement/infoprovision/laws/offshore_report_korea/"
                  className="text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  外国制度（大韓民国） ｜個人情報保護委員会
                </a>
              </p>
              <p className="mb-2 text-base leading-relaxed">・第三者が講ずる個人情報保護措置</p>
              <p className="mb-4 text-base leading-relaxed">
                提供先は、概ね個人データの取扱いについて我が国の個人情報取扱事業者に求めら
                れる措置と同水準の措置を講じております。
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-base font-bold">5．個人情報の開示・訂正・利用停止等</h3>
              <p className="text-base leading-relaxed">
                会員から個人情報について開示、訂正、利用停止等の申し出があった場合には、下記問合
                わせ窓口に申し出ることができます。申し出に対しては、会員本人であることを確認させていただいたうえで、当社所定の手続きに従い、合理的な期間内に対応いたします。なお、
                個人情報の開示につきましては、手数料としてご請求１件につき1,000円（消費税別）を
                お支払いいただきます。
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-base font-bold">6．安全管理措置</h3>
              <p className="text-base leading-relaxed">
                当社は、個人データ（当社が取得し、または取得しようとしている個人情報であって、当
                社が個人データとして取り扱うことを予定しているものを含みます。以下本条において同
                じとします。）への不正アクセスまたは個人データの漏えい、滅失または毀損の防止その
                他の個人データの安全管理のために、技術的および組織的に厳重なセキュリティ対策を講
                じます。当社は個人データの保護を継続的・向上的に行なっていくため、当社が定めた社
                内規程等を法令および社会規範の変化にあわせて見直し、改善をしていきます。また、個
                人データは、利用目的の達成に必要な期間保持します。
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-base font-bold">7．プライバシーポリシーの改定</h3>
              <p className="text-base leading-relaxed">
                本ポリシーは改定されることがあります。改定については本ウェブサイト上に掲載又は登
                録のメールアドレスに通知いたします。
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-base font-bold">8. 個人情報に関する問い合わせ窓口</h3>
              <p className="mb-6 text-base leading-relaxed">
                個人情報に関する問い合わせ窓口は下記のとおりとします。
              </p>
              <div className="mb-6 text-center text-base">記</div>
              <div className="mb-8 space-y-2 text-base">
                <p className="mb-4">株式会社bibin</p>
                <p className="mb-6">mail：bibinshop@bibinews.jp</p>
                <p>※お問い合わせは24時間受け付けております。</p>
                <p className="whitespace-pre-wrap">
                  ※土・日曜日、祝日、その他運営事務局休業日の場合は、翌営業日以降の対応と
                  させていただきます。
                </p>
              </div>
              <div className="text-right text-base">
                <p>2025年2月26日 制定</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

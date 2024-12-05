import { BackButton } from '@/components/button/back-button';
import { Typography } from '@/components/ui/typography';

/**
 * プライバシーポリシーコンポーネント
 * @returns JSX.Element
 */
// TODO: google oauthの審査を先行させるために、https://bibin.jp/privacy のテキストを抜粋。正規のものを受け取ったら差し替え
export function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl rounded-xl bg-white-base p-8">
      <div className="mb-[16px] flex w-full items-center justify-between md:mb-[24px] md:justify-center">
        <BackButton />
        <Typography
          as="boldXLarge"
          element="h1"
          className="text-[16px] text-black-90 md:text-[24px]"
        >
          プライバシーポリシー
        </Typography>
        <div className="h-7 w-7" />
      </div>

      <div className="space-y-8">
        <section>
          <div className="mb-6">
            <p className="text-center leading-relaxed">
              株式会社bibin（以下、「当社」といいます）は、
              業務上取り扱う個人情報の保護について本プライバシーポリシーを定め、
              個人情報に関する法規制及び以下の事項を遵守します。
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-bold">1. 個人情報の利用目的</h3>
              <p className="mb-4 leading-relaxed">
                当社は、当社が行う業務において、個人情報を下記利用目的の達成に必要な範囲で利用します。
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2">(1) お客様に関する個人情報</h4>
                  <ul className="list-inside list-disc space-y-2 pl-4">
                    <li>当社に対するお問合せへの対応</li>
                    <li>キャンペーン結果のお客様への通知</li>
                    <li>商品、サービスの販売、配送</li>
                    <li>より良い商品、サービス開発のための調査、分析</li>
                    <li>
                      当社が運営又は管理する各公式サイト、公認サイトにおける情報やキャンペーンの告知
                    </li>
                    <li>お客さまとの連絡、協力、交渉、契約の遂行等</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2">(2) お取引先の皆様に関する個人情報</h4>
                  <ul className="list-inside list-disc space-y-2 pl-4">
                    <li>お取引先との連絡、協力、交渉、契約の遂行等</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2">(3) お取引先から委託された個人情報</h4>
                  <ul className="list-inside list-disc space-y-2 pl-4">
                    <li>お取引先との契約履行等</li>
                  </ul>
                  <p className="mt-2 leading-relaxed">
                    なお、当社が委託された個人情報は当社事業および委託契約の内容の範囲内で取り扱わせていただきます。
                  </p>
                </div>
                <div>
                  <h4 className="mb-2">(4) 当社へ入社を希望される皆様に関する個人情報</h4>
                  <ul className="list-inside list-disc space-y-2 pl-4">
                    <li>連絡、情報のご提供および採用選考</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2">(5) 従業員に関する個人情報</h4>
                  <ul className="list-inside list-disc space-y-2 pl-4">
                    <li>当社の事業運営における従業員の労務管理、人事管理</li>
                    <li>当社従業員の労働安全管理（労働安全衛生法に基づく健康診断等）</li>
                    <li>福利厚生の提供</li>
                    <li>税務処理等の各省庁への届出</li>
                    <li>その他当社事業の業務に必要な範囲</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-bold">2. 個人情報の管理及び管理者</h3>
              <p className="leading-relaxed">
                当社は個人情報の取扱いに関してその実施及び運用に関する責任と権限を有するものを管理責任者として任命し、
                管理者を中心に教育や監査を通じて組織的に個人情報の保護に取り組みます。
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold">3. 個人情報の第三者提供</h3>
              <p className="mb-4 leading-relaxed">
                当社は、次に掲げる場合を除き、お客様の個人情報を第三者に提供することはございません。
              </p>
              <ul className="list-inside list-decimal space-y-2 pl-4">
                <li>ご本人の同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>
                  人の生命、身体又は財産の保護のために必要がある場合であって、ご本人様の同意を得ることが困難な場合
                </li>
                <li>
                  公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合であって、ご本人様の同意を得ることが困難な場合
                </li>
                <li>
                  国の機関もしくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であってご本人様の同意を得ることによって当該事務の遂行に支障を及ぼすおそれがある場合
                </li>
                <li>
                  業務を円滑に遂行するため、利用目的の達成に必要な範囲内で個人情報の取扱いの全部又は一部を委託する場合
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-bold">4. 個人情報取扱いの委託</h3>
              <p className="mb-4 leading-relaxed">
                当社は事業運営上、お客様により良いサービスを提供するために業務の一部を外部に委託することがあります。
                この場合、個人情報を適切に取り扱っていると認められる委託先を選定し、
                契約等において個人情報の適正管理・機密保持などにより
                お客様の個人情報の漏洩防止に必要な事項を取決め、適切な管理を実施させます。
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold">5. 閲覧履歴情報等の取扱い</h3>
              <p className="mb-4 leading-relaxed">
                当社は、閲覧履歴情報等（ご利用いただいたサービスやご覧になった広告の履歴、
                サイト内での操作履歴、お客様のIPアドレス、Cookie情報、位置情報、端末固有の識別情報などを指します。
                ただし、当該情報等を他の情報と照合することにより個人を識別できる場合には、個人情報として取り扱います。以下同じ。）を、
                次の目的の範囲内で利用します。また、当社は、閲覧履歴情報等を利用目的の範囲内で外部委託先に提供することがあります。
              </p>
              <ul className="list-inside list-decimal space-y-2 pl-4">
                <li>より良い商品、サービス開発のための調査</li>
                <li>ウェブサイトの利用傾向の分析</li>
                <li>お客様に適した広告の配信</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-bold">6. 個人情報の開示・訂正等の請求</h3>
              <p className="leading-relaxed">
                お客様は、当社に対してご自身の個人情報の開示・訂正等（利用目的の通知、開示、
                内容の訂正・追加・削除、利用の停止または消去、第三者への提供の停止）に関して、
                当社問合わせ窓口に申し出ることができます。その際、当社はお客様ご本人を確認させていただいたうえで、
                合理的な期間内に対応いたします。
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold">7. Cookie情報について</h3>
              <p className="leading-relaxed">
                当社サイトではクッキー（Cookie）を使用しています。
                Cookieは、お客さまが当社のサイトに再度訪問された際、より便利に当サイトを閲覧していただくためのものであり、
                お客さまのプライバシーを侵害するものではなく、またお客さまのコンピューターへ悪影響を及ぼすことはありません。
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold">8. 「個人情報の取扱いについて」の変更</h3>
              <p className="leading-relaxed">
                当サイトでは、SSL（Secure Sockets
                Layer）暗号化技術を用いて、お客様の情報が送信される際の通信を暗号化しております。
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold">9. 個人情報に関するお問合せ窓口</h3>
              <p className="mb-4 leading-relaxed">
                お客様の個人情報に関するお問合せにつきましては、下記窓口で受付けております。
              </p>
              <div className="space-y-2">
                <p>株式会社bibin</p>
                <p>mail：info@bibinews.jp</p>
                <p>※お問い合わせは24時間受付けております。</p>
                <p>
                  ※土・日曜日、祝日、その他当社休業日の場合は、翌営業日以降の対応とさせていただきます。
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

import { BackButton } from '@/components/button/back-button';
import { Typography } from '@/components/ui/typography';

export async function TermsOfUse() {
  return (
    <div className="mx-auto max-w-4xl rounded-xl bg-white-base p-8">
      <div className="mb-[16px] flex w-full items-center justify-between md:mb-[24px] md:justify-center">
        <BackButton />
        <Typography
          as="boldXLarge"
          element="h1"
          className="text-[16px] text-black-90 md:text-[24px]"
        >
          利用規約
        </Typography>
        <div className="h-7 w-7" />
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4 font-bold">第1章 総則</h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2">第1条 （規約の目的）</h3>
              <p className="leading-relaxed">
                本利用規約（以下「本規約」という。）は、弊社及び会員、並びに会員相互間の関係を規律することをもって、bibin
                の安全かつ円滑な利用に資することを目的とするものである。
              </p>
            </div>

            <div>
              <h3 className="mb-2">第2条 （定義）</h3>
              <p className="mb-2">本規約上、特に断りがない限り、次のとおり定義する。</p>
              <div className="space-y-2 pl-4">
                <div className="flex gap-4">
                  <span>①</span>
                  <div>
                    <span className="font-medium">本サービス</span>
                    <span className="ml-4">
                      指定プラットフォームを通じて会員に提供する各種サービスの総体であり、名称を
                      「bibin」という
                    </span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span>②</span>
                  <div>
                    <span className="font-medium">指定プラットフォーム</span>
                    <span className="ml-4">
                      本サービスの提供のために弊社が会員に向けて指定するプラットフォーム
                    </span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span>③</span>
                  <div>
                    <span className="font-medium">会員</span>
                    <span className="ml-4">
                      本規約に同意し、所定の方法で会員登録をした個人又は法人
                    </span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span>④</span>
                  <div>
                    <span className="font-medium">会員情報</span>
                    <span className="ml-4">
                      ユーザー名、ID、パスワード等、会員がアカウントを使用するために必要な一切の情報
                    </span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span>⑤</span>
                  <div>
                    <span className="font-medium">取引</span>
                    <span className="ml-4">
                      本サービスを利用した商品の購入、又は商品応募等、会員が行う各種活動
                    </span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span>⑥</span>
                  <div>
                    <span className="font-medium">取引情報</span>
                    <span className="ml-4">
                      会員の取引内容、その他取引に関し弊社が得た会員に関する一切の個人情報
                    </span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span>⑦</span>
                  <div>
                    <span className="font-medium">出品者</span>
                    <span className="ml-4">取引の対象になる商品を提供する会員</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span>⑧</span>
                  <div>
                    <span className="font-medium">利用者</span>
                    <span className="ml-4">取引の対象になる商品を購入する会員</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2">第3条 （本サービスの内容）</h3>
              <p className="leading-relaxed">
                本サービスの内容は、指定プラットフォーム上に掲示されたとおりとする。
              </p>
            </div>

            <div>
              <h3 className="mb-2">第4条 （本サービスの変更、一時停止）</h3>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  弊社は、いつでも、本サービスの内容の全部又は一部を変更若しくは追加することができる。
                </li>
                <li>前項の場合、弊社は、適切な時期及び方法により、会員に対して周知する。</li>
                <li>
                  弊社は、以下の各号に定める場合、会員に事前に通知することなく、本サービスの全部又は一部を一時停止することができる。
                </li>
              </ol>
              <div className="mt-2 space-y-2 pl-6">
                <div className="flex gap-4">
                  <span>①</span>
                  <span>定期又は緊急にシステム保守を行う場合</span>
                </div>
                <div className="flex gap-4">
                  <span>②</span>
                  <span>
                    システムに過度な負荷が発生する等、本サービス運営に支障をきたす可能性がある場合
                  </span>
                </div>
                <div className="flex gap-4">
                  <span>③</span>
                  <span>システムのセキュリティを維持するために必要な場合</span>
                </div>
                <div className="flex gap-4">
                  <span>④</span>
                  <span>
                    通信回線の停止、天災、火災、停電、その他の不慮の事故又は戦争、紛争、動乱、暴動、労働争議等の不可抗力により本サービスの提供が困難な場合
                  </span>
                </div>
                <div className="flex gap-4">
                  <span>⑤</span>
                  <span>
                    その他弊社が本サービスに関する状況に照らして合理的に中断が必要と判断した場合
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-bold">第2章 会員登録に関する諸規定</h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2">第5条 （会員登録）</h3>
              <ol className="list-decimal space-y-2 pl-6">
                <li>本規約に同意し、所定の会員登録手続を完了した者は、会員となることができる。</li>
                <li>
                  会員登録は会員になろうとする者が自ら行わなければならず、代理登録は一切認められない。
                </li>
                <li>
                  会員登録が適当でないと判断される場合、弊社は登録申請を拒否することができる。
                </li>
                <li>
                  会員は、弊社の指定する電磁的方法により、弊社から連絡又は通知がなされることを承諾する。
                </li>
              </ol>
            </div>

            <div>
              <h3 className="mb-2">第6条 （会員情報の管理等）</h3>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  会員は、会員情報の漏洩等を防止する措置を講ずるものとし、会員が使用するコンピュータへのアクセスを制限し、会員情報を他人に知られないよう定期的に変更する等、会員情報に関するセキュリティを適切に維持する責任を負う。
                </li>
                <li>
                  弊社は、会員情報及び取引情報（以下「会員情報等」という。）の取得、利用、開示、保有及び保護を含む会員情報等の取り扱いに関する事項については弊社の
                  <a
                    href="https://bibin.shop/privacy-policy"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    「当社サイトに関するプライバシーポリシー」
                  </a>
                  に従う。
                </li>
              </ol>
            </div>

            <div>
              <h3 className="mb-2">第7条 （会員登録の終了）</h3>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  会員は、システム上の所定の退会手続きにより、いつでも会員登録を終了すること（以下「退会」という。）ができる。
                </li>
                <li>
                  退会する会員は、退会後は即時に本サービスを一切利用できなくなること、及び本サービスの会員として弊社に対して有していた一切の権利が消滅することについて、予め承知する。
                </li>
                <li>
                  退会する会員は、弊社に対して債務を負っている場合、弁済期の如何に関わらず直ちに、全てを弁済しなければならないことについて、予め承知する。
                </li>
                <li>
                  退会がなされた場合であっても、退会以前に成立した取引については本規約が適用される。
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">第8条 （会員資格の抹消等）</h3>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  弊社は、会員が次の各号のいずれかに該当する場合、当該会員に係る会員資格の抹消又は一時停止（以下「会員資格の抹消等」という。）の措置により、当該会員に対し本サービスの利用を拒否することができる。
                </li>
              </ol>
              <div className="mt-2 space-y-2 pl-6">
                <div className="flex gap-4">
                  <span>①</span>
                  <span>会員が第18条に規定する禁止行為を行った場合</span>
                </div>
                <div className="flex gap-4">
                  <span>②</span>
                  <span>
                    弊社が会員情報等を確認できない場合、又は長期間にわたり本サービスの利用がない場合
                  </span>
                </div>
                <div className="flex gap-4">
                  <span>③</span>
                  <span>
                    前各号に類する場合等、弊社が会員に対し本サービスの提供を拒否する必要があると判断した場合
                  </span>
                </div>
              </div>
              <ol className="list-decimal space-y-2 pl-6" start={2}>
                <li>
                  会員資格の抹消等がなされた場合であっても、会員資格の抹消等以前に成立した取引については本規約が適用される。
                </li>
              </ol>
            </div>

            <div>
              <h3 className="mb-2">第9条 （会員資格譲渡の禁止）</h3>
              <p className="leading-relaxed">
                会員は、第三者に対して会員資格を譲渡することはできない。
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-bold">第3章 取引に関する諸規定</h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2">第10条 （契約の成立）</h3>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  本サービスを通じて利用者が商品を注文し、出品者がこれに同意することで利用者と出品者との間に取引契約が成立する。
                </li>
                <li>
                  利用者が同時に複数商品を注文する場合、当該注文及びこれに対する出品者の同意は本サービス上の注文番号単位で行われたものとみなし、取引の成立単位もこれに倣う。
                </li>
                <li>
                  利用者が海外（商品の送付元が利用者の所在する国の領域外である場合をいう。以下同じ。）から発送される商品を注文する場合、当該商品を国内に輸入、及び販売し得るものであるか否かについて、利用者の責任と負担において確認を実施する。
                </li>
                <li>
                  前項の注文に際し本サービス上の翻訳ソフトを使用した場合も、前項と同様とする。
                </li>
              </ol>
            </div>

            <div>
              <h3 className="mb-2">第11条 （申込拒絶事由）</h3>
              <p className="mb-2">
                前条第1項の規定に関わらず、次の各号のいずれかに該当する場合は、利用者の注文がなされなかったものとみなし、取引は成立しない。
              </p>
              <div className="space-y-2 pl-6">
                <div className="flex gap-4">
                  <span>①</span>
                  <span>利用者が本規約に違反する場合</span>
                </div>
                <div className="flex gap-4">
                  <span>②</span>
                  <span>利用者が過去に本規約に反した場合</span>
                </div>
                <div className="flex gap-4">
                  <span>③</span>
                  <span>利用者の注文において、商品の届け先として日本国外の住所を指定する場合</span>
                </div>
                <div className="flex gap-4">
                  <span>④</span>
                  <span>利用者が一度に大量の注文を行った場合</span>
                </div>
                <div className="flex gap-4">
                  <span>⑤</span>
                  <span>利用者の注文が転売目的と認められる場合</span>
                </div>
                <div className="flex gap-4">
                  <span>⑥</span>
                  <span>利用者の注文が第三者によるなりすましと認められる場合</span>
                </div>
                <div className="flex gap-4">
                  <span>⑦</span>
                  <span>利用者に関する情報に虚偽や誤りが認められる場合</span>
                </div>
                <div className="flex gap-4">
                  <span>⑧</span>
                  <span>
                    利用者が申告する決済手段について、当該利用者が正当な権限を有しておらず、又は当該決済手段を正当に使用することができないおそれがある場合
                  </span>
                </div>
                <div className="flex gap-4">
                  <span>⑨</span>
                  <span>
                    前各号の他、利用者の注文がなされなかったとみなすべき合理的な事情が認められる場合
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2">第12条 （決済）</h3>
              <p className="leading-relaxed">
                利用者は、本サービス上に表示する支払期限までに、同表示する支払方法により、第10条第1項に基づき成立した契約に係る売買代金（但し、海外から商品が発送される場合は関税費用を含む）を支払う。
              </p>
            </div>

            <div>
              <h3 className="mb-2">第13条 （商品発送時期・方法）</h3>
              <p className="leading-relaxed">
                出品者は、本サービス上に商品発送時期、及び方法を表示するものとし、当該表示に従い利用者に対して商品を発送する。
              </p>
            </div>

            <div>
              <h3 className="mb-2">第14条 （所有権移転・危険負担）</h3>
              <p className="leading-relaxed">
                商品の所有権は、利用者が商品の引渡しを受けた（手渡しで受領した場合に限らず、利用者の管理権限の及ぶ領域に商品が到達した場合を広く含む。以下同じ。）時点で移転するものとし、引渡し以降に生じた商品の滅失又は毀損に関する危険は利用者が負担する。
              </p>
            </div>

            <div>
              <h3 className="mb-2">第15条 （返品）</h3>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  利用者は、商品の引渡しを受けた日の翌日から起算して8日以内であれば、本サービスを通じて出品者に返品又は交換（以下「返品等」という。）を依頼することができる。但し、次の各号に該当する場合はこの限りではない。
                  <div className="mt-2 space-y-2 pl-6">
                    <div className="flex gap-4">
                      <span>①</span>
                      <span>利用者の責に帰すべき事由によって商品が滅失又は毀損した場合</span>
                    </div>
                    <div className="flex gap-4">
                      <span>②</span>
                      <span>
                        利用者が使用し、又は一部を消費したことにより商品の価値が減少した場合
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <span>③</span>
                      <span>
                        時間の経過により商品の価値が減少し、再販売が著しく困難になった場合
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <span>④</span>
                      <span>商品の包装が毀損した場合</span>
                    </div>
                    <div className="flex gap-4">
                      <span>⑤</span>
                      <span>
                        その他利用者による返品等の依頼を拒否すべき合理的な理由が認められる場合
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  返品等に必要な送料及び付随的な費用は、返品等の理由について責に帰すべき事由が認められる会員が負担する。なお、返品等の際に誤って異なる物品を送付した場合は、会員の間で誠実な話し合いをもって解決することを旨指すものとし、弊社はこれに関与しない。
                </li>
                <li>
                  払戻しは、購入時の決済手段に応じた方法で行うものとし、利用者は必要に応じ弊社の指示に従う。その際、払い戻しのために必要な振込手数料が発生するときは、利用者がこれを負担する。なお、払い戻される金銭に対して利息は発生しない。
                </li>
              </ol>
            </div>

            <div>
              <h3 className="mb-2">第16条 （レビューに関する規定）</h3>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  レビューに関わる著作権（日本国著作権法第27条及び第28条所定の権利を含む。）等の一切の権利は当社に帰属する。また、利用者はレビューに関して、著作者人格権その他いかなる権利も行使しないものとする。
                </li>
                <li>
                  当社は、レビューの内容を、当該レビューを投稿した利用者に通知することなく、自由に転載、引用、開示、提供、出版、配信その他の方法により、無償で利用することができるものとし、利用者はこれに同意する。
                </li>
                <li>
                  レビューを表示するかどうか、その表示期間および当社による保管期間については、当社の裁量で定めることができるものとし、利用者はこれに異議を述べることができないものとする。
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-bold">第4章 禁止行為等</h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2">第17条 （反社会的勢力の排除）</h3>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  会員は、自己又は自社、自社の株主・役員その他自社を実質的に所有し若しくは支配する者が、暴力団、暴力団員、暴力団員でなくなった時から5年を経過しない者、暴力団準構成員、暴力団関係企業、総会屋等、社会運動等標ぼうゴロ又は特殊知能暴力集団等、その他これらに準ずる者（以下総称して「反社会的勢力」という。）に該当しないこと、及び次の各号のいずれにも該当しないことを表明し、かつ将来にわたっても該当しないことを確約する。
                  <div className="mt-2 space-y-2 pl-6">
                    <div className="flex gap-4">
                      <span>①</span>
                      <span>暴力団員等が経営を支配していると認められる関係を有すること</span>
                    </div>
                    <div className="flex gap-4">
                      <span>②</span>
                      <span>
                        暴力団員等が経営に実質的に関与していると認められる関係を有すること
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <span>③</span>
                      <span>
                        自己、自社若しくは第三者の不正の利益を図る目的又は第三者に損害を加える目的をもってするなど、不当に暴力団員等を利用していると認められる関係を有すること
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <span>④</span>
                      <span>
                        暴力団員等に対して資金等を提供し、又は便宜を供与するなどの関与をしていると認められる関係を有すること
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <span>⑤</span>
                      <span>
                        役員又は経営に実質的に関与している者が暴力団員等と社会的に非難されるべき関係を有すること
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  弊社は、会員が本条に違反したことにより損害を被ったときは、当該会員に対し、その一切の損害の賠償を請求することができる。
                </li>
              </ol>
            </div>

            <div>
              <h3 className="mb-2">第18条 （禁止事項）</h3>
              <p className="mb-4">会員が次の各号に掲げる行為を行うことは禁止されている。</p>
              <div className="space-y-2 pl-6">
                <div className="flex gap-4">
                  <span>①</span>
                  <span>
                    法令、本規約、指定プラットフォーム上に掲示された利用案内又は注意事項等に違反する行為
                  </span>
                </div>
                <div className="flex gap-4">
                  <span>②</span>
                  <span>会員情報を第三者に貸与若しくは譲渡し、又は第三者と共に使用する行為</span>
                </div>
                <div className="flex gap-4">
                  <span>③</span>
                  <span>
                    指定プラットフォーム外で直接取引することを勧誘する行為及び指定プラットフォームで開始された取引を指定プラットフォーム以外で完了させ、又は完了させようとする行為
                  </span>
                </div>
                <div className="flex gap-4">
                  <span>④</span>
                  <span>
                    他の会員若しくは会員以外の第三者の権利、利益、名誉等を侵害し、又は侵害するおそれのある行為
                  </span>
                </div>
                <div className="flex gap-4">
                  <span>⑤</span>
                  <span>
                    指定プラットフォーム上のシステムを不正に稼働させ、若しくは正常に稼働させず、又はそれらのおそれのある一切の行為
                  </span>
                </div>
                <div className="flex gap-4">
                  <span>⑥</span>
                  <span>本サービスに悪影響を与える行為又は悪影響を与えるおそれのある行為</span>
                </div>
                <div className="flex gap-4">
                  <span>⑦</span>
                  <span>その他、弊社が合理的な根拠に基づき不適合であると判断する行為</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2">第19条 （本サービスの停止等）</h3>
              <p className="mb-2">
                弊社は、次の各号のいずれかに該当する場合には、会員に事前に通知することなく、本サービスの全部または一部の提供を停止又は中断することができる。
              </p>
              <div className="space-y-2 pl-6">
                <div className="flex gap-4">
                  <span>①</span>
                  <span>
                    本サービスに係るコンピューター・システムの点検又は保守作業を緊急に行う場合
                  </span>
                </div>
                <div className="flex gap-4">
                  <span>②</span>
                  <span>
                    コンピュータ、通信障害、誤作動、過度なアクセスの集中、不正アクセス、ハッキング等により本サービスの運営ができなくなった場合
                  </span>
                </div>
                <div className="flex gap-4">
                  <span>③</span>
                  <span>
                    地震、落雷、火災、風水害，停電、天災地変などの不可抗力により本サービスの運営ができなくなった場合
                  </span>
                </div>
                <div className="flex gap-4">
                  <span>④</span>
                  <span>その他、当社が停止又は中断を必要と合理的に判断した場合</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2">第20条 （規約の変更等）</h3>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  弊社は、必要な場合、特定のサービス又は状況に適用される補足規則及び方針を定めることができる。これらの補足規則及び方針、並びに指定プラットフォーム上に記載された公示、利用案内及び注意事項は本規約の一部を構成する。
                </li>
                <li>
                  弊社は、本規約を自ら任意に合理的範囲内で改定することができ、指定プラットフォーム上で告知された改定日をもってその効力が発生するものとする。本規約改定後、会員が指定プラットフォーム又は本サービスを利用する場合、利用者は改定された本規約を遵守することに同意したものとみなされる。
                </li>
                <li>
                  本規約の一部が違法、無効、又は何らかの理由で執行不能と判断される場合、当該条項は他の条項の効力に影響を及ぼすものではない。
                </li>
              </ol>
            </div>

            <div>
              <h3 className="mb-2">第21条 （事業者の損害賠償責任の免除）</h3>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  次の各号に定める損害は、当該損害が弊社の故意又は過失に起因する場合を除き、当該損害を被った会員が負担する。また、当該損害が弊社の軽過失に起因する場合、弊社の賠償の範囲は、当該損害が発生した日から遡り直近12か月間に当該損害を被った会員が弊社に対して支払った手数料の総額又は５万円のいずれか高い金額を超えない範囲に限られる。
                  <div className="mt-2 space-y-2 pl-6">
                    <div className="flex gap-4">
                      <span>①</span>
                      <span>
                        会員情報の管理又は使用（第三者による会員情報の不正使用を含む。）に関連又は起因して会員に生じた損害
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <span>②</span>
                      <span>退会に関連又は起因して会員に生じた損害</span>
                    </div>
                    <div className="flex gap-4">
                      <span>③</span>
                      <span>会員情報の変更若しくは抹消等に関連又は起因して会員に生じた損害</span>
                    </div>
                    <div className="flex gap-4">
                      <span>④</span>
                      <span>取引が正常に履行されないことに関連又は起因して会員に生じた損害</span>
                    </div>
                    <div className="flex gap-4">
                      <span>⑤</span>
                      <span>
                        商品情報の正確性、最新性、有用性、安全性、適法性の全部若しくは一部が欠けることに関連又は起因して会員に生じた損害
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <span>⑥</span>
                      <span>商品の契約不適合に関連又は起因して会員に生じた損害</span>
                    </div>
                    <div className="flex gap-4">
                      <span>⑦</span>
                      <span>一方の会員の規約違反に関連又は起因して他方の会員に生じた損害</span>
                    </div>
                    <div className="flex gap-4">
                      <span>⑧</span>
                      <span>
                        通信障害、誤作動、過度なアクセスの集中、不正アクセス、ハッキング等の技術的な問題により本サービスが一時的又は恒久的に利用できなくなることに関連又は起因して会員に生じた損害
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <span>⑨</span>
                      <span>
                        本サービスに係るコンピューター・システムの点検又は保守作業に関連又は起因して会員に生じた損害
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <span>⑩</span>
                      <span>その他本サービスの利用に関連又は起因して会員に生じた一切の損害</span>
                    </div>
                  </div>
                </li>
                <li>
                  前項に関わらず、本サービスの内容若しくは仕様又は本規約の変更に関連又は起因して会員に生じた損害は、専ら会員に損害を与えることを目的としていることが明らかである等、弊社の経営判断を逸脱したものと認められる場合を除き、弊社は一切の責任を負わない。
                </li>
              </ol>
            </div>

            <div>
              <h3 className="mb-2">第22条 （会員に対する損害賠償）</h3>
              <p className="leading-relaxed">
                会員が本条に定めるいずれかの条項に違反することにより、弊社が第三者から損害賠償を請求され、損害若しくは損失の補填、又は費用負担をした場合、会員は弊社に対し、その全額、及び関連する合理的な費用（弁護士費用を含みますが、これに限られません）を補償する。
              </p>
            </div>

            <div>
              <h3 className="mb-2">第23条 （準拠法・専属的合意管轄）</h3>
              <p className="leading-relaxed">
                本規約は日本法に基づき解釈されるものとし、本サービスに関し紛争等の法的手続の必要を生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とする。
              </p>
            </div>

            <div className="mt-8 text-left">
              <p className="mt-8">株式会社bibin</p>
              <p className="mt-8">2025年6月13日 制定</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

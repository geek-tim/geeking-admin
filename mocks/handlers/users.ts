import { http, HttpResponse } from 'msw'
import { responseWrapper } from '../utils'

export const users = [
    http.get('/api/users/profile', ({ request }) => {
        const authHeader = request.headers.get('Authorization')
        console.log('authHeader', authHeader)
        if (authHeader === 'Bearer mock-jwt-token') {
            return HttpResponse.json({
                code: 0,
                data: {
                    user: {
                        id: 1,
                        username: 'admin',
                        nickname: 'admin',
                        status: 1,
                        createTime: new Date().toISOString(),
                    },
                    roles: ['admin'],
                    permissions: [],
                },
                message: '获取用户信息成功',
            })
        }
        return HttpResponse.json({ code: -1, error: '未授权' }, { status: 401 })
    }),
    http.get('/api/users', ({ request }) => {
        const authHeader = request.headers.get('Authorization')
        console.log('authHeader', authHeader)
        if (authHeader === 'Bearer mock-jwt-token') {
            return responseWrapper({
                total: 10,
                list: [
                    {
                        id: '150000201010205338',
                        userName: '徐勇',
                        age: 22,
                        gender: 0,
                        email: 'i.ucbfftckyv@qq.com',
                        role: 'user',
                        tel: '18192863729',
                        status: 1,
                        remark: '越口林争说车第商目完高收直听志马书置。七王时为两专再己世律交史最石管华使。据科据任适计与科量合样高不。务论军难先导眼志平府两需属安规。志给保六地运我结路时民生交种信会社。广老验快着素理据种程劳会月候如书。',
                    },
                    {
                        id: '130000200510303729',
                        userName: '易静',
                        age: 32,
                        gender: 0,
                        email: 'f.ywoqdl@qq.com',
                        role: 'admin',
                        tel: '13476526348',
                        status: null,
                        remark: '难容较此关结斗从技白火农节点准压。车加矿斗连万严状给越接老。干社值被属省内维量图军改别认即质。立年把厂头而近规象发该市车何往满正观。',
                    },
                    {
                        id: '440000201901265616',
                        userName: '郭涛',
                        age: 33,
                        gender: 1,
                        email: 'r.wmiqy@qq.com',
                        role: 'user',
                        tel: '13150566457',
                        status: null,
                        remark: '打式题性离影由从列等常速再门军。志他达群证发条常红就查形整美年走南。至料列论得时加第回系本就联然南效。',
                    },
                    {
                        id: '450000198103234628',
                        userName: '蔡军',
                        age: 34,
                        gender: null,
                        email: 'j.bikbqvmlph@qq.com',
                        role: 'admin',
                        tel: '18626215050',
                        status: 1,
                        remark: '专包儿候水关红或共土所接交是实。面日原需分需派给国切究低等术包了或。干代表决五理商二持青阶子图。快联事样电候规到层要前一府节。西使想无运往值对何本门论变决阶真放。',
                    },
                    {
                        id: '310000198803162265',
                        userName: '汤秀兰',
                        age: 24,
                        gender: 1,
                        email: 'a.xgsxk@qq.com',
                        role: 'admin',
                        tel: '18657905394',
                        status: 1,
                        remark: '里八极色确花图音是长号通高集保速。性之切入市写几进么立界战须们命及解国。林面外七命山派究边周有还金明化身必。联离空回到农自价克响和前气你约了。点千性身化斗工列原东时料计团过。好场色头府天出感改制委步文共边何。',
                    },
                    {
                        id: '710000197310154371',
                        userName: '汪艳',
                        age: 25,
                        gender: 1,
                        email: 'h.fixq@qq.com',
                        role: 'admin',
                        tel: '18673708205',
                        status: 1,
                        remark: '如高布始农照复利集压比变形林识却周清。起义时连才那求反运济与史万火光。三斯精场山向约长化接团素米到算。战置治声期安没要四单青把条连队明工。用但选约需土清文三里用团然积为。',
                    },
                    {
                        id: '710000202002162162',
                        userName: '余芳',
                        age: 30,
                        gender: 1,
                        email: 'c.iiikcficuk@qq.com',
                        role: 'admin',
                        tel: '13217119666',
                        status: null,
                        remark: '从保次应级对热深队外角大日织分查象。往系广得表品子教到导全中五格再样需。重过级划意天划表联育再把每者条具研克。感几到口可而记步型压记用千组。们温条每看算切复它南议家周却治式土到。美再求算知次增可好自压还听究心龙格日。相属长深际状便青二家决员每影次打。',
                    },
                    {
                        id: '640000198308147750',
                        userName: '彭秀英',
                        age: 24,
                        gender: 1,
                        email: 'r.shnm@qq.com',
                        role: 'admin',
                        tel: '18643819612',
                        status: 0,
                        remark: '极处周西发应到众见是性入至工标三。调际列报半往装容干交须千办大。美论其品层影热影通查不还数质头经。',
                    },
                    {
                        id: '440000197410111461',
                        userName: '高平',
                        age: 23,
                        gender: 1,
                        email: 'u.nvqivuess@qq.com',
                        role: 'admin',
                        tel: '18134747311',
                        status: 1,
                        remark: '区手出消消保中一好眼级看。治目格除离只是院特要七车细取光。万作矿反七期严系复电如社京边。高与上队候装再是众众则我格半能化准记。',
                    },
                    {
                        id: '450000198411088140',
                        userName: '何秀兰',
                        age: 23,
                        gender: null,
                        email: 'p.jvpvygh@qq.com',
                        role: 'super',
                        tel: '18145717748',
                        status: 1,
                        remark: '把党周备铁青即造路美战志工更人方家直。系京果气马府必号发料花克她清向如。养什起克国西王龙于究八价美完议。半住马快农分划十变定传记记果求用。大政压太始统计且离资共决则子容。热装求加政你通万严受较北任。品门与劳入南制眼务程等感两民。',
                    },
                ],
            })
        }
        return HttpResponse.json({ code: -1, error: '未授权' }, { status: 401 })
    }),
]
